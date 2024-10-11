import { $ } from 'zx'
import * as p from '@clack/prompts'
import { Command } from 'nest-commander'

import { BaseCommandRunner } from '~/common/commander/base.command'

@Command({
  name: 'migrate:revert',
  description: '还原上次执行的迁移',
})
export class RevertMigrateCommand extends BaseCommandRunner {
  async run() {
    const { stdout } = await this.execute(
      '还原上次执行的迁移',
      async () => await $`node bin/typeorm.js -d ./src/config/modules/datasource.config.ts migration:revert`,
    )

    p.note(stdout.trim().replace(process.cwd(), '').replace('/', ''), 'Output')
  }
}
