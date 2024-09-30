import { Command, CommandRunner } from 'nest-commander'

import { SettingsMigrationGenerator } from './generator'

@Command({
  name: 'migrate:gen:settings',
  description: '根据 settings.ts 生成迁移文件',
})
export class SettingsGenerateMigrateCommand extends CommandRunner {
  async run() {
    const generate = new SettingsMigrationGenerator(
      './src/modules',
      './src/database/migrations',
    )

    await generate.run()
      .catch((e) => {
        console.error(e)
        generate.stop()
      })
  }
}
