import { $ } from 'zx'
import * as p from '@clack/prompts'
import { Command } from 'nest-commander'

import { BaseCommandRunner } from '~/common/commander/base.command'

@Command({
  name: 'migrate:run',
  description: '执行迁移',
})
export class RunMigrateCommand extends BaseCommandRunner {
  async run() {
    const { stdout } = await this.execute(
      '执行迁移',
      async () => await $`node bin/typeorm.js -d ./src/config/modules/datasource.config.ts migration:run`,
    )

    p.note(stdout.trim().replace(process.cwd(), '').replace('/', ''), 'Output')
  }
}
