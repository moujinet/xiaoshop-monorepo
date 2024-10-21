#!/usr/bin/env node

import { Command } from 'commander'
import * as color from 'picocolors'
import { intro, outro } from '@clack/prompts'

import { Console } from '@/utils/console'
import { CommandLoader } from '@/common/loader'

async function client() {
  // eslint-disable-next-line ts/no-require-imports
  const { name, version } = require('../../package.json')

  intro(color.bgCyan(color.black(` ${name} `)))

  const program = new Command()

  program
    .usage('<command> [options]')
    .option('-d, --debug', 'display debug information.')
    .helpOption('-h, --help', 'display usage information.')
    .version(version, '-v, --version', 'display the current version.')

  program.exitOverride()

  program.configureOutput({
    writeOut(str: string) {
      Console.info(str)
    },

    writeErr(err: string) {
      Console.error(err)
    },
  })

  program.showHelpAfterError('See --help for all available options.')

  await CommandLoader.init(program)

  await program.parseAsync(process.argv)
    .catch(() => {})
    .finally(() => {
      outro(`Problem? ${color.underline(color.cyan('https://github.com/moujinet/xiaoshop-monorepo/issues'))}`)
    })
}

client()
