import { posix } from 'node:path'
import { Command } from 'commander'
import * as color from 'picocolors'
import * as Table from 'cli-table3'
import { existsSync } from 'node:fs'
import { pascalCase } from 'es-toolkit/string'

import { Console } from '@/utils/console'
import { ConfigPath } from '@/config/path'
import { AbstractCommand } from '@/common/command'

export class SchematicCommand extends AbstractCommand {
  async load(program: Command) {
    program
      .command('new <schematic>')
      .summary('generate a XiaoShop element.')
      .description(await this.buildDescription())
      .action(
        async (schematic: string) => {
          await this.handle(schematic)
        },
      )
  }

  async handle(name: string) {
    try {
      const schematicName = this.getSchematics().find(
        s => s.alias === name || s.name === name,
      )?.name || ''

      if (!schematicName)
        throw new Error(`Undefined: ${color.yellowBright(name)}`)

      const className = `${pascalCase(schematicName)}Schematic`
      const classFile = posix.join(ConfigPath.paths.CLI, 'dist', 'schematics', `${schematicName}.js`)

      if (!existsSync(classFile))
        throw new Error(`Not found: ${color.gray(classFile.replace(process.cwd(), '.'))}`)

      // eslint-disable-next-line ts/no-require-imports
      const SchematicClass = require(classFile)[className]
      const schematic = new SchematicClass()

      return await schematic.handle()
    }
    catch (e) {
      Console.error(e)
    }
  }

  private async buildDescription(): Promise<string> {
    return (
      `Generate a XiaoShop element.\n  \n`
      + `Available schematics: \n${this.buildSchematicsListAsTable(this.getSchematics())}`
    )
  }

  private buildSchematicsListAsTable(schematics: ISchematicDefinition[]): string {
    const tableConfig = {
      chars: {
        'mid': '',
        'left-mid': '',
        'mid-mid': '',
        'right-mid': '',
      },
    }
    const table: any = new Table(tableConfig)
    for (const schematic of schematics) {
      table.push([
        color.blue(schematic.name),
        color.blueBright(schematic.alias),
        color.gray(schematic.description),
      ])
    }
    return table.toString()
  }

  private getSchematics(): ISchematicDefinition[] {
    return [
      { alias: 'mo', name: 'module', description: 'Generate a new Module' },
      { alias: 'do', name: 'domain', description: 'Generate a new Domain' },
      { alias: 'm', name: 'model', description: 'Generate a new Model' },
      { alias: 'c', name: 'controller', description: 'Generate a new Controller' },
      { alias: 'sch', name: 'scheduler', description: 'Generate a new Scheduler Service' },
      { alias: 'set', name: 'setting', description: 'Generate a new Setting file' },
    ]
  }
}
