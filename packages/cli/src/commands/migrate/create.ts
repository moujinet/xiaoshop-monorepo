import { $ } from 'zx'
import { text } from '@clack/prompts'

import { loadConfig } from '@/config'
import { highlightPath } from '@/utils'
import { Console } from '@/utils/console'

export class CreateMigrate implements IHandler {
  async handle() {
    const name = await text({
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

    Console.step.start('Creating migration %s', name)

    const { typeorm } = loadConfig()
    const { stdout } = await $`node ${typeorm.lib} migration:create ${typeorm.migrations}/${name}`

    Console.step.done('Create Migration')
    Console.note(highlightPath(stdout), 'Output')
  }
}
