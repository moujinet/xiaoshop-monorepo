import { $ } from 'zx'
import * as p from '@clack/prompts'
import { Command } from 'nest-commander'

import { BaseCommandRunner } from '~/common/commander/base.command'

@Command({
  name: 'migrate:create',
  arguments: '<name>',
  description: '创建数据库迁移文件',
})
export class CreateMigrateCommand extends BaseCommandRunner {
  async run(inputs: string[]) {
    const name = inputs[0]

    const { stdout } = await this.execute(
      '创建迁移文件',
      async () => await $`node bin/typeorm.js migration:create ./src/database/migrations/${name}`,
    )

    p.note(stdout.trim().replace(process.cwd(), '').replace('/', ''), 'Output')
  }
}
