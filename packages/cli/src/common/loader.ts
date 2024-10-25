import { posix } from 'node:path'
import { Command } from 'commander'
import { existsSync } from 'node:fs'

import { ConfigPath } from '@/config/path'
import { MigrateCommand } from '@/commands/migrate'
import { SchematicCommand } from '@/commands/schematic'

export class CommandLoader {
  static async init(program: Command) {
    if (existsSync(ConfigPath.paths.CLI)) {
      // eslint-disable-next-line ts/no-require-imports
      const localCommandLoader = require(posix.join(ConfigPath.paths.CLI, 'dist', 'common', 'loader'))
      await localCommandLoader.CommandLoader.load(program)
    }
    else {
      await CommandLoader.load(program)
    }
  }

  static async load(program: Command) {
    /**
     * 脚手架
     *
     * $ new <schematic>
     */
    await new SchematicCommand().load(program)

    /**
     * 数据库迁移
     *
     * $ migrate <action>
     */
    await new MigrateCommand().load(program)

    /**
     * 数据库备份
     *
     * $ backup
     */
  }
}
