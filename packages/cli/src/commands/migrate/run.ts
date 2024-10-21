import { $ } from 'zx'

import { loadConfig } from '@/config'
import { highlightPath } from '@/utils'
import { Console } from '@/utils/console'

export class RunMigrate implements IHandler {
  async handle() {
    Console.step.start('Running all migrations')

    const { typeorm } = loadConfig()
    const { stdout } = await $`node ${typeorm.lib} -d ${typeorm.datasource} migration:run`

    Console.step.done('Run All Migrations')
    Console.note(highlightPath(stdout), 'Output')
  }
}
