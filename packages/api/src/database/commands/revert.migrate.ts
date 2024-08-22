import { Command, CommandRunner } from 'nest-commander'
import * as p from '@clack/prompts'
import { $ } from 'zx'

@Command({
  name: 'migrate:revert',
  description: '还原上次执行的迁移',
})
export class RevertMigrateCommand extends CommandRunner {
  async run() {
    const spinner = p.spinner()

    p.log.step('还原上次执行的迁移')

    spinner.start('开始还原上次执行的迁移')

    await $`node bin/typeorm.js -d ./src/configs/modules/datasource.config.ts migration:revert`

    spinner.stop('还原迁移成功')
  }
}
