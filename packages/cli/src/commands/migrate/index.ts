import { posix } from 'node:path'
import { Command } from 'commander'
import * as color from 'picocolors'
import * as Table from 'cli-table3'
import { existsSync } from 'node:fs'
import { pascalCase } from 'es-toolkit/string'

import { Console } from '@/utils/console'
import { ConfigPath } from '@/config/path'
import { AbstractCommand } from '@/common/command'

export class MigrateCommand extends AbstractCommand {
  async load(program: Command) {
    program
      .command('migrate <action>')
      .summary('database migration.')
      .description(this.buildDescription())
      .action(
        async (action: string) => {
          await this.handle(action)
        },
      )
  }

  private getActions() {
    return [
      { alias: 'c', name: 'create', description: 'Create a new Migration' },
      { alias: 'g', name: 'generate', description: 'Generate migration from schema & settings' },
      { alias: 're', name: 'revert', description: 'Revert last migration' },
      { alias: 'r', name: 'run', description: 'Run all migrations' },
    ]
  }

  async handle(name: string) {
    try {
      const actionName = this.getActions().find(
        a => a.alias === name || a.name === name,
      )?.name || ''

      if (!actionName)
        throw new Error(`Undefined: ${color.yellowBright(name)}`)

      const className = `${pascalCase(actionName)}Migrate`
      const classFile = posix.join(
        ConfigPath.paths.CLI,
        'dist',
        'commands',
        'migrate',
        `${actionName}.js`,
      )

      if (!existsSync(classFile))
        throw new Error(`Not found: ${color.gray(classFile.replace(process.cwd(), '.'))}`)

      // eslint-disable-next-line ts/no-require-imports
      const ActionClass = require(classFile)[className]
      const action: IHandler = new ActionClass()

      return await action.handle()
    }
    catch (e) {
      Console.error(e)
    }
  }

  private buildDescription(): string {
    return (
      `Database migration.\n  \n`
      + `Available actions: \n${this.buildActionsListAsTable(this.getActions())}`
    )
  }

  private buildActionsListAsTable(actions: any[]): string {
    const tableConfig = {
      chars: {
        'mid': '',
        'left-mid': '',
        'mid-mid': '',
        'right-mid': '',
      },
    }
    const table: any = new Table(tableConfig)
    for (const action of actions) {
      table.push([
        color.blue(action.name),
        color.blueBright(action.alias),
        color.gray(action.description),
      ])
    }
    return table.toString()
  }
}
