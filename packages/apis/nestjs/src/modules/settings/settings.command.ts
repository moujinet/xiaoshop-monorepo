import { Command, CommandRunner } from 'nest-commander'
import { SettingsMigrationGenerator } from './settings.generator'

@Command({
  name: 'settings:gen',
  description: '根据 *.settings.ts 生成迁移文件',
})
export class GenerateSettingsMigrateCommand extends CommandRunner {
  async run() {
    const generate = new SettingsMigrationGenerator('./src/modules', './src/db/migrations')

    await generate.run()
      .catch((e) => {
        console.error(e)
        generate.stop()
      })
  }
}
