import { Command, CommandRunner } from 'nest-commander'
import * as p from '@clack/prompts'
import * as color from 'picocolors'
import { $ } from 'zx'

@Command({
  name: 'migrate:gen',
  arguments: '<name>',
  description: '根据 Entity 生成迁移文件',
})
export class GenerateMigrateCommand extends CommandRunner {
  async run(inputs: string[]) {
    const name = inputs[0]
    const spinner = p.spinner()

    p.log.step(`生成迁移文件: ${color.cyan(name)}`)

    spinner.start('开始生成迁移文件')

    await $`node bin/typeorm.js -d ./src/db/datasource.ts migration:generate ./src/db/migrations/${name}`

    spinner.stop('生成迁移文件成功')

    p.outro('完成')
  }
}
