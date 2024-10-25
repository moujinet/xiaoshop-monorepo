import { $ } from 'zx'

import { loadConfig } from '@/config'
import { highlightPath } from '@/utils'
import { Console } from '@/utils/console'

export class RevertMigrate implements IHandler {
  async handle() {
    Console.step.start('Revert migrations')

    const { typeorm } = loadConfig()
    const { stdout } = await $`node ${typeorm.lib} -d ${typeorm.datasource} migration:revert`

    Console.step.done('Revert Migrations')
    Console.note(highlightPath(stdout), 'Output')
  }
}
