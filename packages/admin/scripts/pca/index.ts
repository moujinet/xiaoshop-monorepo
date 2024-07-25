import * as clack from '@clack/prompts'
import color from 'picocolors'
import { checkUpdate, update } from './updater'
import { exportAll } from './exporter'

async function main() {
  // eslint-disable-next-line no-console
  console.clear()

  clack.intro(`${color.bgCyan(` PCA Updater `)}`)

  if (await checkUpdate()) {
    await update().then(updates => exportAll(updates))
  }

  clack.outro('😊 结束')
}

main().catch(e => clack.log.error(e.message))
