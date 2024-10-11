import { $ } from 'zx'
import * as p from '@clack/prompts'
import { Command } from 'nest-commander'

import { BaseCommandRunner } from '~/common/commander/base.command'

@Command({
  name: 'migrate:gen',
  arguments: '<name>',
  description: '根据 Entity 生成迁移文件',
})
export class GenerateSchemaMigrateCommand extends BaseCommandRunner {
  async run(inputs: string[]) {
    const name = inputs[0]

    const { stdout } = await this.execute(
      '生成迁移文件',
      async () => await $`node bin/typeorm.js -d ./src/config/modules/datasource.config.ts migration:generate ./src/database/migrations/${name}`,
    )

    p.note(stdout.trim().replace(process.cwd(), '').replace('/', ''), 'Output')
  }
}
