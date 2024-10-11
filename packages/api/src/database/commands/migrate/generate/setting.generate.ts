import { glob } from 'glob'
import * as p from '@clack/prompts'
import { Command } from 'nest-commander'
import { dirname, join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

import configuration from '~/config'
import { BaseCommandRunner } from '~/common/commander/base.command'

interface Setting {
  key: string
  value: string
}

interface Metadata {
  create: Setting[]
  update: Setting[]
  restore: Setting[]
  delete: Setting[]
}

@Command({
  name: 'migrate:gen:settings',
  description: '根据 settings.ts 生成迁移文件',
})
export class GenerateSettingsMigrateCommand extends BaseCommandRunner {
  private readonly tablePrefix: string
  private readonly moduleDir: string
  private readonly migrationDir: string
  private readonly timestamp = Date.now().toString()
  private output: Metadata

  constructor() {
    super()

    this.tablePrefix = configuration().mysql.entityPrefix
    this.moduleDir = join(process.cwd(), './src/modules')
    this.migrationDir = join(process.cwd(), './src/database/migrations')

    this.output = {
      create: [],
      update: [],
      restore: [],
      delete: [],
    }
  }

  async run() {
    const settings = await this.loadSettings()
    const migrations = await this.loadMigrations()

    const outputName = `${this.timestamp}-settings.ts`

    await this.execute('预处理迁移数据', async () => {
      const migrationKeys = migrations.map(m => m.key)

      if (migrations.length > 0) {
        const creates = settings.filter(s => !migrationKeys.includes(s.key))

        if (creates.length > 0)
          this.output.create.push(...creates)

        const updates = settings.filter(s => migrationKeys.includes(s.key))

        if (updates.length > 0) {
          for (const setting of updates) {
            const migration = migrations.find(m => m.key === setting.key)

            if (migration && migration.value !== setting.value) {
              this.output.update.push(setting)
              this.output.restore.push(migration)
            }
          }
        }

        const deletes = settings.filter(s => !migrationKeys.includes(s.key))

        if (deletes.length > 0)
          this.output.delete.push(...deletes)
      }
      else {
        this.output.create.push(...settings)
      }
    })

    await this.execute(
      '生成迁移文件',
      async () => {
        this.generateFile(outputName, this.output)
      },
    ).then(
      () => {
        const note = this.isNeedGenerate()
          ? `Migration ${outputName} has been generated successfully.`
          : 'No need to generate migration.'

        p.note(note, 'Output',
        )
      },
    )
  }

  async loadSettings(): Promise<Setting[]> {
    return await this.execute('加载 Setting 文件', async () => {
      const whitelist = ['system.setting']
      const files = await glob('**/settings.ts', { cwd: this.moduleDir })

      const settings: Setting[] = []

      for (const file of files) {
        const prefix = dirname(file).replace(/\//g, '.')
        const content = readFileSync(join(this.moduleDir, file), 'utf-8')
        const lines = content.split('\n')

        lines.filter(line => line.includes('\': '))
          .forEach((line) => {
            const [key, value] = line.split(': ')
            const settingKey = whitelist.includes(prefix) ? key.trim() : `${prefix}.${key.trim()}`

            settings.push({
              key: settingKey.replace(/'/g, ''),
              value: value.replace(/^'(.*)',$/g, '$1'),
            })
          })
      }

      return settings
    })
  }

  async loadMigrations(): Promise<Setting[]> {
    return await this.execute('加载 Migration 文件', async () => {
      const files = await glob(['**/*-settings.ts'], { cwd: this.migrationDir })

      let migrations: Setting[] = []

      for (const file of files) {
        const content = readFileSync(join(this.migrationDir, file), 'utf8')
        const lines = content.split('\n')

        lines.filter(line => line.includes('\/\/ @'))
          .forEach((line) => {
            // @CREATE
            if (line.includes('\/\/ @CREATE: ')) {
              const creates = JSON.parse(line.replace('\/\/ @CREATE: ', '')) as Setting[]

              if (creates)
                migrations.push(...creates)
            }

            // @UPDATE
            else if (line.includes('\/\/ @UPDATE: ')) {
              const updates = JSON.parse(line.replace('\/\/ @UPDATE: ', '')) as Setting[]

              if (updates)
                migrations.push(...updates)
            }

            // @DELETE
            else if (line.includes('\/\/ @DELETE: ')) {
              const deletes = JSON.parse(line.replace('\/\/ @DELETE: ', '')) as Setting[]

              if (deletes)
                migrations = migrations.filter(setting => !deletes.map(d => d.key).includes(setting.key))
            }
          })
      }

      return migrations
    })
  }

  /**
   * 生成迁移文件
   *
   * @param outputName string
   * @param output Metadata
   */
  private generateFile(outputName: string, output: Metadata) {
    const buffer: string[] = []
    const className = `Settings${this.timestamp}`

    buffer.push('import { MigrationInterface, QueryRunner } from \'typeorm\'\n')
    buffer.push(`export class ${className} implements MigrationInterface {`)

    //
    // !======> Up
    //
    buffer.push('  public async up(queryRunner: QueryRunner): Promise<void> {')
    // 插入
    this.convertToInsert(buffer, output.create)
    // 更新
    this.convertToUpdate(buffer, output.update)
    // 删除
    this.convertToDelete(buffer, output.delete)

    buffer.push('  }\n')

    //
    // !======> Down
    //
    buffer.push('  public async down(queryRunner: QueryRunner): Promise<void> {')
    // 恢复已删除
    this.convertToInsert(buffer, output.delete)
    // 恢复已更新
    this.convertToUpdate(buffer, output.restore)
    // 删除已创建
    this.convertToDelete(buffer, output.create)

    buffer.push('  }')
    buffer.push('}\n')

    //
    // !======> Metadata
    //
    buffer.push(`// @CREATE: ${JSON.stringify(output.create)}`)
    buffer.push(`// @UPDATE: ${JSON.stringify(output.update)}`)
    buffer.push(`// @RESTORE: ${JSON.stringify(output.restore)}`)
    buffer.push(`// @DELETE: ${JSON.stringify(output.delete)}`)
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
  private convertToInsert(buffer: string[], settings: Setting[]) {
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
  private convertToUpdate(buffer: string[], settings: Setting[]) {
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
  private convertToDelete(buffer: string[], settings: Setting[]) {
    if (settings.length > 0) {
      buffer.push(`    await queryRunner.query(\`DELETE FROM \\\`${this.getTableName('system_settings')}\\\` WHERE \\\`key\\\` IN (\n      \'${settings.map(s => s.key).join('\',\n      \'')}\'\n    )\`)`)
    }
  }

  private isNeedGenerate() {
    return this.output.create.length > 0
      || this.output.update.length > 0
      || this.output.delete.length > 0
      || this.output.restore.length > 0
  }

  private getTableName(table: string): string {
    return `${this.tablePrefix}${table}`
  }
}
