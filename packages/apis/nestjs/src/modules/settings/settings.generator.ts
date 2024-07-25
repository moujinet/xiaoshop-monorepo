import { readFileSync, writeFileSync } from 'node:fs'
import { setTimeout } from 'node:timers/promises'
import { basename, join } from 'node:path'
import * as p from '@clack/prompts'
import * as color from 'picocolors'
import { glob } from 'glob'

interface Setting {
  key: string
  value: string
}

interface Settings {
  id: string
  settings: Setting[]
}

interface Migration {
  id: string
  create: Setting[]
  update: Setting[]
  restore: Setting[]
  remove: Setting[]
}

export class SettingsMigrationGenerator {
  private timestamp = Date.now().toString()
  private moduleDir: string
  private migrationDir: string
  private migrations: Migration[] = []
  private spinner = p.spinner()

  constructor(
    moduleDir: string,
    migrationDir: string,
  ) {
    this.moduleDir = join(process.cwd(), moduleDir)
    this.migrationDir = join(process.cwd(), migrationDir)

    this.spinner.start('生成迁移配置文件')
  }

  /**
   * 预处理
   */
  async prepare() {
    this.spinner.message('开始预处理')

    const settings = await this.loadSettings()
    const migrations = await this.loadMigrations()

    if (migrations.length > 0) {
      migrations.forEach((migration) => {
        const newModule = settings.find(module => module.id === migration.id)

        // 存在，处理变更部分
        if (newModule) {
          const newMigration: Migration = this.migrations.find(m => m.id === migration.id) || {
            id: migration.id,
            create: [],
            update: [],
            restore: [],
            remove: [],
          }

          // 新增配置
          const newSettings = newModule.settings.filter(n => !migration.settings.map(s => s.key).includes(n.key))

          if (newSettings.length > 0) {
            newSettings.forEach(s => newMigration.create.push(s))
          }

          // 更新配置
          const updateSettings = newModule.settings.filter(n => migration.settings.map(s => s.key).includes(n.key))

          if (updateSettings.length > 0) {
            updateSettings.forEach((s) => {
              const oldSetting = migration.settings.find(n => n.key === s.key)
              if (oldSetting && oldSetting.value !== s.value) {
                newMigration.update.push(s)
                newMigration.restore.push(oldSetting)
              }
            })
          }

          // 删除配置
          const removeSettings = migration.settings.filter(n => !newModule.settings.map(s => s.key).includes(n.key))

          if (removeSettings.length > 0) {
            removeSettings.forEach(s => newMigration.remove.push(s))
          }

          if (
            newMigration.create.length > 0
            || newMigration.update.length > 0
            || removeSettings.length > 0
          ) {
            this.migrations.push(newMigration)
          }
        }
      })
    }
    else {
      // 全新
      settings.forEach((module) => {
        this.migrations.push({
          id: module.id,
          create: module.settings,
          update: [],
          restore: [],
          remove: [],
        })
      })
    }
  }

  /**
   * 加载设置文件
   *
   * @returns Promise<Settings[]>
   */
  async loadSettings(): Promise<Settings[]> {
    const settings: Settings[] = []
    const files = await glob(['**/*.settings.ts'], { cwd: this.moduleDir })

    this.spinner.message('开始加载 Settings 文件')

    await setTimeout(1000)

    files
      .forEach((file) => {
        const id = basename(file, '.settings.ts')
        const content = readFileSync(join(this.moduleDir, file), 'utf8')
        const lines = content.split('\n')

        settings.push({
          id,
          settings: lines
            .filter(
              line => line.includes('\': '),
            ).map((line) => {
              const [key, value] = line.split(': ')
              return {
                key: key.trim().replace(/'/g, ''),
                value: value.replace(/^'(.*)',$/g, '$1'),
              }
            }),
        })
      })

    return settings
  }

  /**
   * 加载迁移文件
   *
   * @returns Promise<Settings[]>
   */
  async loadMigrations(): Promise<Settings[]> {
    const migrations: Settings[] = []
    const files = await glob(['**/*-settings.ts'], { cwd: this.migrationDir })

    this.spinner.message('开始加载 Migrations 文件')

    await setTimeout(1000)

    files.forEach((file) => {
      const id = basename(file, '-settings.ts').split('-')[1]
      const content = readFileSync(join(this.migrationDir, file), 'utf8')
      const lines = content.split('\n')

      const isNew = !migrations.find(m => m.id === id)
      const migration: Settings = migrations.find(m => m.id === id) || {
        id: '',
        settings: [],
      }

      lines
        .filter(line => line.includes('\/\/ @'))
        .forEach((line) => {
          if (line.includes('\/\/ @CREATE: ')) {
            const creates = JSON.parse(line.replace('\/\/ @CREATE: ', '')) as Setting[]
            if (creates.length > 0) {
              migration.settings.push(...creates)
            }
          }

          if (line.includes('\/\/ @UPDATE: ')) {
            const updates = JSON.parse(line.replace('\/\/ @UPDATE: ', '')) as Setting[]
            if (updates.length > 0) {
              migration.settings.push(...updates)
            }
          }

          if (line.includes('\/\/ @REMOVE: ')) {
            const removes = JSON.parse(line.replace('\/\/ @REMOVE: ', '')) as Setting[]
            if (removes.length > 0) {
              migration.settings = migration.settings.filter(s => !removes.map(d => d.key).includes(s.key))
            }
          }

          if (line.includes('\/\/ @ID: ')) {
            migration.id = line.replace('\/\/ @ID: ', '')
          }
        })

      if (isNew) {
        migrations.push(migration)
      }
    })

    return migrations
  }

  /**
   * 插入数据
   *
   * @param buffer string[]
   * @param id string
   * @param settings Setting[]
   */
  insertMigration(buffer: string[], id: string, settings: Setting[]) {
    if (settings.length > 0) {
      const insert: string[] = []

      settings.forEach((setting) => {
        insert.push(`      ('${id === 'default' ? setting.key : `${id}.${setting.key}`}', '${setting.value}')`)
      })

      buffer.push('    await queryRunner.query(`INSERT INTO \\`manage_settings\\` (\\`key\\`, \\`value\\`) VALUES ')
      buffer.push(insert.join(',\n'))
      buffer.push('    `)')
    }
  }

  /**
   * 更新数据
   *
   * @param buffer string[]
   * @param id string
   * @param settings Setting[]
   */
  updateMigration(buffer: string[], id: string, settings: Setting[]) {
    if (settings.length > 0) {
      settings.forEach((setting) => {
        const key = id === 'default' ? setting.key : `${id}.${setting.key}`
        buffer.push(`    await queryRunner.query(\`UPDATE \\\`manage_settings\\\` SET \\\`value\\\` = '${setting.value}' WHERE \\\`key\\\` = '${key}'\`)`)
      })
    }
  }

  /**
   * 删除数据
   *
   * @param buffer string[]
   * @param id string
   * @param settings Setting[]
   */
  deleteMigration(buffer: string[], id: string, settings: Setting[]) {
    if (settings.length > 0) {
      const ids = settings.map(setting => id === 'default' ? setting.key : `${id}.${setting.key}`)
      buffer.push(`    await queryRunner.query(\`DELETE FROM \\\`manage_settings\\\` WHERE \\\`key\\\` IN (\n      \'${ids.join('\',\n      \'')}\'\n    )\`)`)
    }
  }

  /**
   * 生成迁移文件
   *
   * @param migration Migration
   */
  async generateMigrationFile(migration: Migration) {
    const buffer: string[] = []
    const className = `${migration.id.charAt(0).toUpperCase() + migration.id.slice(1)}Settings${this.timestamp}`
    const outputName = `${this.timestamp}-${migration.id}-settings.ts`

    buffer.push('import { MigrationInterface, QueryRunner } from \'typeorm\'\n')
    buffer.push(`export class ${className} implements MigrationInterface {`)

    //
    // !======> Up
    //
    buffer.push('  public async up(queryRunner: QueryRunner): Promise<void> {')
    // 插入
    this.insertMigration(buffer, migration.id, migration.create)
    // 更新
    this.updateMigration(buffer, migration.id, migration.update)
    // 删除
    this.deleteMigration(buffer, migration.id, migration.remove)

    buffer.push('  }\n')

    //
    // !======> Down
    //
    buffer.push('  public async down(queryRunner: QueryRunner): Promise<void> {')
    // 恢复已删除
    this.insertMigration(buffer, migration.id, migration.remove)
    // 恢复已更新
    this.updateMigration(buffer, migration.id, migration.restore)
    // 删除已创建
    this.deleteMigration(buffer, migration.id, migration.create)

    buffer.push('  }')
    buffer.push('}\n')

    //
    // !======> Meta
    //
    buffer.push(`// @ID: ${migration.id}`)
    buffer.push(`// @CREATE: ${JSON.stringify(migration.create)}`)
    buffer.push(`// @UPDATE: ${JSON.stringify(migration.update)}`)
    buffer.push(`// @RESTORE: ${JSON.stringify(migration.restore)}`)
    buffer.push(`// @REMOVE: ${JSON.stringify(migration.remove)}`)
    buffer.push('// -------------------------------------------------')
    buffer.push('// Generated by XiaoShop API Client\n')

    writeFileSync(
      join(this.migrationDir, outputName),
      buffer.join('\n'),
    )
  }

  /**
   * 生成迁移
   */
  async run() {
    await this.prepare()

    for (const migration of this.migrations) {
      const outputName = `${this.timestamp}-${migration.id}-settings.ts`
      this.spinner.message(`开始生成 ${outputName} 迁移文件`)
      await setTimeout(500)
      await this.generateMigrationFile(migration)
    }
    this.spinner.stop('生成迁移文件成功')

    p.note(`Generated ${this.migrations.length > 0 ? color.green(this.migrations.length) : color.red(this.migrations.length)} Migration Files`, 'Finished')
  }

  /**
   * 终止生成
   */
  async stop() {
    p.cancel('终止生成')
    process.exit(0)
  }
}
