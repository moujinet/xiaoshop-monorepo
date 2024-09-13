import { $ } from 'zx'
import * as p from '@clack/prompts'
import { Command, CommandRunner } from 'nest-commander'

@Command({
  name: 'migrate:run',
  description: '执行迁移',
})
export class RunMigrateCommand extends CommandRunner {
  async run() {
    const spinner = p.spinner()

    p.log.step('执行迁移')

    spinner.start('开始执行迁移')

    await $`node bin/typeorm.js -d ./src/configs/modules/datasource.config.ts migration:run`

    spinner.stop('迁移执行成功')
  }
}
