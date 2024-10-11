import * as p from '@clack/prompts'
import * as color from 'picocolors'
import { Module } from '@nestjs/common'
import { CommandFactory } from 'nest-commander'

import {
  CreateMigrateCommand,
  GenerateSchemaMigrateCommand,
  GenerateSettingsMigrateCommand,
  RevertMigrateCommand,
  RunMigrateCommand,
} from '~/database/commands'

@Module({
  providers: [
    CreateMigrateCommand,
    GenerateSchemaMigrateCommand,
    GenerateSettingsMigrateCommand,
    RunMigrateCommand,
    RevertMigrateCommand,
  ],
})
export class ClientModule {}

(async () => {
  console.clear()

  p.intro(`${color.bgCyan(color.black(' XiaoShop API DevTools '))}`)

  await CommandFactory.run(ClientModule, {
    cliName: 'xiaoshop',
  })

  p.outro('完成')
})()
  // .then(() =>
  //   process.exit(0),
  // )
  .catch(
    console.error,
  )
