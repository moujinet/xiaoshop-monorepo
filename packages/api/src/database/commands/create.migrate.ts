import { $ } from 'zx'
import * as p from '@clack/prompts'
import * as color from 'picocolors'
import { Command, CommandRunner } from 'nest-commander'

@Command({
  name: 'migrate:create',
  arguments: '<name>',
  description: '创建数据库迁移文件',
})
export class CreateMigrateCommand extends CommandRunner {
  async run(inputs: string[]) {
    const name = inputs[0]
    const spinner = p.spinner()

    p.log.step(`创建迁移文件: ${color.cyan(name)}`)

    spinner.start('开始创建迁移文件')

    const { stdout } = await $`node bin/typeorm.js migration:create ./src/database/migrations/${name}`

    spinner.stop('创建迁移文件成功')

    p.note(stdout.trim().replace(process.cwd(), '').replace('/', ''), 'Output')
  }
}
