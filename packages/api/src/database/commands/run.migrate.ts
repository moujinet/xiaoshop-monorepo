import { Command, CommandRunner } from 'nest-commander'
import * as p from '@clack/prompts'
import { $ } from 'zx'

@Command({
  name: 'migrate:run',
  description: '执行迁移',
})
export class RunMigrateCommand extends CommandRunner {
  async run() {
    const spinner = p.spinner()

    p.log.step('执行迁移')

    spinner.start('开始执行迁移')

    await $`node bin/typeorm.js -d ./src/db/datasource.ts migration:run`

    spinner.stop('迁移执行成功')
  }
}
