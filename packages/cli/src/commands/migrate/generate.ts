import { $ } from 'zx'
import { glob } from 'glob'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { confirm, group, text } from '@clack/prompts'

import { loadConfig } from '@/config'
import { highlightPath } from '@/utils'
import { readFile } from '@/utils/file'
import { Console } from '@/utils/console'

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

export class GenerateMigrate implements IHandler {
  private readonly config: IConfig
  private readonly tablePrefix: string
  private readonly timestamp = (Date.now() + 10000).toString()

  private output: Metadata

  constructor() {
    this.config = loadConfig()
    this.tablePrefix = this.config.tablePrefix || ''

    this.output = {
      create: [],
      update: [],
      restore: [],
      delete: [],
    }
  }

  async handle() {
    const prompts = await group(
      {
        schema: () => confirm({
          message: 'Generate schema?',
          initialValue: true,
        }),
        settings: () => confirm({
          message: 'Generate settings?',
          initialValue: true,
        }),
        name: ({ results }) => {
          if (results.schema) {
            return text({
              message: 'What is the name of the migration?',
              validate: (value: string) => {
                if (value.length === 0) {
                  return 'Migrate name is required'
                }
                if (value.search(/^[a-z]/gi) === -1) {
                  return 'Migrate name must be start with a letter.'
                }
              },
            })
          }
        },
      },
      {
        onCancel: () => {
          Console.cancel('Operation Cancelled.')
          process.exit(0)
        },
      },
    )

    if (prompts.schema) {
      await this.handleSchema(String(prompts.name))
    }

    if (prompts.settings) {
      await this.handleSettings()
    }
  }

  private async handleSchema(name: string) {
    Console.step.start('Generating migration %s', name)

    const {
      lib,
      datasource,
      migrations,
    } = this.config.typeorm

    const { stdout } = await $`node ${lib} -d ${datasource} migration:generate ${migrations}/${name}`

    Console.step.done('Generate Migration')
    Console.note(highlightPath(stdout), 'Output')
  }

  private async handleSettings() {
    Console.step.start('Preparing')

    const settings = await this.loadSettings()
    const migrations = await this.loadMigrations()

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

    Console.step.success('Prepare Settings')

    if (this.isNeedGenerateSettings()) {
      await this.generateSettings()
    }
    else {
      Console.note('No settings need to be generated.', 'Info')
    }
  }

  private async generateSettings() {
    Console.step.start('Generating Settings')

    const buffer: string[] = []
    const className = `Settings${this.timestamp}`

    buffer.push('import { MigrationInterface, QueryRunner } from \'typeorm\'\n')
    buffer.push(`export class ${className} implements MigrationInterface {`)

    //
    // !======> Up
    //
    buffer.push('  public async up(queryRunner: QueryRunner): Promise<void> {')
    // 插入
    this.convertToInsert(buffer, this.output.create)
    // 更新
    this.convertToUpdate(buffer, this.output.update)
    // 删除
    this.convertToDelete(buffer, this.output.delete)

    buffer.push('  }\n')

    //
    // !======> Down
    //
    buffer.push('  public async down(queryRunner: QueryRunner): Promise<void> {')
    // 恢复已删除
    this.convertToInsert(buffer, this.output.delete)
    // 恢复已更新
    this.convertToUpdate(buffer, this.output.restore)
    // 删除已创建
    this.convertToDelete(buffer, this.output.create)

    buffer.push('  }')
    buffer.push('}\n')

    //
    // !======> Metadata
    //
    buffer.push(`// @CREATE: ${JSON.stringify(this.output.create)}`)
    buffer.push(`// @UPDATE: ${JSON.stringify(this.output.update)}`)
    buffer.push(`// @RESTORE: ${JSON.stringify(this.output.restore)}`)
    buffer.push(`// @DELETE: ${JSON.stringify(this.output.delete)}`)
    buffer.push('// -------------------------------------------------')
    buffer.push('// Generated by XiaoShop API DevTools\n')

    const outputFile = join(this.config.typeorm.migrations, `${this.timestamp}-settings.ts`)

    writeFileSync(outputFile, buffer.join('\n'))

    Console.step.success('Generate Settings')
    Console.note(
      highlightPath(`Migration ${outputFile} has been generated successfully.`),
      'Success',
    )
  }

  private async loadSettings(): Promise<Setting[]> {
    const whitelist = ['system.setting']
    const files = await glob('**/settings.ts', { cwd: this.config.moduleRoot })

    const settings: Setting[] = []

    for (const file of files) {
      const prefix = dirname(file).replace(/\//g, '.')
      const content = readFile(file, this.config.moduleRoot)
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
  }

  private async loadMigrations(): Promise<Setting[]> {
    const files = await glob('**/-settings.ts', { cwd: this.config.typeorm.migrations })

    let migrations: Setting[] = []

    for (const file of files) {
      const content = readFile(file, this.config.typeorm.migrations)
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

  private isNeedGenerateSettings() {
    return this.output.create.length > 0
      || this.output.update.length > 0
      || this.output.delete.length > 0
      || this.output.restore.length > 0
  }

  private getTableName(table: string): string {
    return `${this.tablePrefix}${table}`
  }
}
