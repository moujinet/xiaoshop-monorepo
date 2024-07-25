import { CommandFactory } from 'nest-commander'
import * as p from '@clack/prompts'
import * as color from 'picocolors'
import { AppModule } from '~/app.module'

async function bootstrap() {
  console.clear()

  p.intro(`${color.bgCyan(color.black(' XiaoShop API DevTools '))}`)

  await CommandFactory.run(AppModule, {
    cliName: 'xiaoshop',
  })

  p.outro('完成')

  process.exit(0)
}

bootstrap().catch(console.error)
