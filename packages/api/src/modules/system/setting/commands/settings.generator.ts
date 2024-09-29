import { glob } from 'glob'
import * as p from '@clack/prompts'
import { dirname, join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

import configuration from '~/configs'

interface Setting {
  key: string
  value: string
}

interface Settings {
  settings: Setting[]
}

interface Migration {
  create: Setting[]
  update: Setting[]
  restore: Setting[]
  delete: Setting[]
}

const skipPrefixs = [
  'system.setting',
]

export class SettingsMigrationGenerator {
  private timestamp = Date.now().toString()
  private moduleDir: string
  private migrationDir: string
  private migrations: Migration
  private spinner = p.spinner()
  private tablePrefix: string

  constructor(
    moduleDir: string,
    migrationDir: string,
  ) {
    this.moduleDir = join(process.cwd(), moduleDir)
    this.migrationDir = join(process.cwd(), migrationDir)
    this.migrations = {
      create: [],
      update: [],
      restore: [],
      delete: [],
    }
    this.tablePrefix = configuration().db.mysql.entityPrefix || ''

    this.spinner.start('生成迁移配置文件')
  }

  async prepare() {
    this.spinner.message('开始预处理')

    const settings = await this.loadSettings()
    const migrations = await this.loadMigrations()
    const migrationKeys = migrations.map(m => m.key)

    if (migrations.length > 0) {
      // Create
      const newSettings = settings.filter(s => !migrationKeys.includes(s.key))

      if (newSettings.length > 0)
        this.migrations.create.push(...newSettings)

      // Update & Restore
      const updateSettings = settings.filter(s => migrationKeys.includes(s.key))

      if (updateSettings.length > 0) {
        updateSettings.forEach((setting) => {
          const oldSetting = migrations.find(m => m.key === setting.key)
          if (oldSetting && oldSetting.value !== setting.value) {
            this.migrations.update.push(setting)
            this.migrations.restore.push(oldSetting)
          }
        })
      }

      // Delete
      const deleteSettings = migrations.filter(m => !settings.map(s => s.key).includes(m.key))

      if (deleteSettings.length > 0)
        this.migrations.delete.push(...deleteSettings)
    }
    else {
      this.migrations.create.push(...settings)
    }
  }

  async loadSettings(): Promise<Setting[]> {
    this.spinner.message('开始加载 Settings 文件')

    const settings: Setting[] = []
    const files = await glob(['**/settings.ts'], { cwd: this.moduleDir })

    files.forEach((file) => {
      const prefix = dirname(file).replace(/\//g, '.')
      const content = readFileSync(join(this.moduleDir, file), 'utf-8')
      const lines = content.split('\n')

      lines.filter(line => line.includes('\': '))
        .forEach((line) => {
          const [key, value] = line.split(': ')
          const settingKey = skipPrefixs.includes(prefix) ? key.trim() : `${prefix}.${key.trim()}`

          settings.push({
            key: settingKey.replace(/'/g, ''),
            value: value.replace(/^'(.*)',$/g, '$1'),
          })
        })
    })

    return settings.sort(
      (a, b) => a.key.localeCompare(b.key),
    )
  }

  async loadMigrations(): Promise<Setting[]> {
    this.spinner.message('开始加载 Migration 文件')

    const migrations: Settings = {
      settings: [],
    }
    const files = await glob(['**/*-settings.ts'], { cwd: this.migrationDir })

    files.forEach((file) => {
      const content = readFileSync(join(this.migrationDir, file), 'utf8')
      const lines = content.split('\n')

      lines.filter(line => line.includes('\/\/ @'))
        .forEach((line) => {
          // @CREATE
          if (line.includes('\/\/ @CREATE: ')) {
            const creates = JSON.parse(line.replace('\/\/ @CREATE: ', '')) as Setting[]
            if (creates)
              migrations.settings.push(...creates)
          }

          // @UPDATE
          else if (line.includes('\/\/ @UPDATE: ')) {
            const updates = JSON.parse(line.replace('\/\/ @UPDATE: ', '')) as Setting[]
            if (updates)
              migrations.settings.push(...updates)
          }

          // @DELETE
          else if (line.includes('\/\/ @DELETE: ')) {
            const deletes = JSON.parse(line.replace('\/\/ @DELETE: ', '')) as Setting[]
            if (deletes)
              migrations.settings = migrations.settings.filter(setting => !deletes.map(d => d.key).includes(setting.key))
          }
        })
    })

    return migrations.settings
  }

  async isNeedGenerate() {
    return this.migrations.create.length > 0
      || this.migrations.update.length > 0
      || this.migrations.delete.length > 0
      || this.migrations.restore.length > 0
  }

  async run() {
    await this.prepare()

    if (await this.isNeedGenerate()) {
      const outputName = `${this.timestamp}-settings.ts`

      this.spinner.message(`开始生成 ${outputName} 迁移文件`)

      await this.generateMigrationFile(this.migrations)

      this.spinner.stop('生成迁移文件成功')
      p.note(outputName, 'Finished')
    }
    else {
      this.spinner.stop('无需生成迁移文件')
    }
  }

  /**
   * 终止生成
   */
  async stop() {
    p.cancel('终止生成')
    process.exit(0)
  }

  /**
   * 生成迁移文件
   *
   * @param migration Migration
   */
  async generateMigrationFile(migration: Migration) {
    const buffer: string[] = []
    const className = `Settings${this.timestamp}`
    const outputName = `${this.timestamp}-settings.ts`

    buffer.push('import { MigrationInterface, QueryRunner } from \'typeorm\'\n')
    buffer.push(`export class ${className} implements MigrationInterface {`)

    //
    // !======> Up
    //
    buffer.push('  public async up(queryRunner: QueryRunner): Promise<void> {')
    // 插入
    this.insertMigration(buffer, migration.create)
    // 更新
    this.updateMigration(buffer, migration.update)
    // 删除
    this.deleteMigration(buffer, migration.delete)

    buffer.push('  }\n')

    //
    // !======> Down
    //
    buffer.push('  public async down(queryRunner: QueryRunner): Promise<void> {')
    // 恢复已删除
    this.insertMigration(buffer, migration.delete)
    // 恢复已更新
    this.updateMigration(buffer, migration.restore)
    // 删除已创建
    this.deleteMigration(buffer, migration.create)

    buffer.push('  }')
    buffer.push('}\n')

    //
    // !======> Meta
    //
    buffer.push(`// @CREATE: ${JSON.stringify(migration.create)}`)
    buffer.push(`// @UPDATE: ${JSON.stringify(migration.update)}`)
    buffer.push(`// @RESTORE: ${JSON.stringify(migration.restore)}`)
    buffer.push(`// @DELETE: ${JSON.stringify(migration.delete)}`)
    buffer.push('// -------------------------------------------------')
    buffer.push('// Generated by XiaoShop API DevTools\n')

    writeFileSync(
      join(this.migrationDir, outputName),
      buffer.join('\n'),
    )
  }

  /**
   * 插入数据
   *
   * @param buffer string[]
   * @param settings Setting[]
   */
  insertMigration(buffer: string[], settings: Setting[]) {
    if (settings.length > 0) {
      const insert: string[] = []

      settings.forEach((setting) => {
        insert.push(`      ('${setting.key}', '${setting.value}')`)
      })

      buffer.push(`    await queryRunner.query(\`INSERT INTO \\\`${this.getTableName('system_settings')}\\\` (\\\`key\\\`, \\\`value\\\`) VALUES `)
      buffer.push(insert.join(',\n'))
      buffer.push('    `)')
    }
  }

  /**
   * 更新数据
   *
   * @param buffer string[]
   * @param settings Setting[]
   */
  updateMigration(buffer: string[], settings: Setting[]) {
    if (settings.length > 0) {
      settings.forEach((setting) => {
        buffer.push(`    await queryRunner.query(\`UPDATE \\\`${this.getTableName('system_settings')}\\\` SET \\\`value\\\` = '${setting.value}' WHERE \\\`key\\\` = '${setting.key}'\`)`)
      })
    }
  }

  /**
   * 删除数据
   *
   * @param buffer string[]
   * @param settings Setting[]
   */
  deleteMigration(buffer: string[], settings: Setting[]) {
    if (settings.length > 0) {
      buffer.push(`    await queryRunner.query(\`DELETE FROM \\\`${this.getTableName('system_settings')}\\\` WHERE \\\`key\\\` IN (\n      \'${settings.map(s => s.key).join('\',\n      \'')}\'\n    )\`)`)
    }
  }

  getTableName(table: string): string {
    return `${this.tablePrefix}${table}`
  }
}
