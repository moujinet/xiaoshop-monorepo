import { basename, dirname, join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import * as clack from '@clack/prompts'
import config from './config'

export function resolvePath(name: string, prefix: string = '', suffix: string = ''): string {
  const baseDir = dirname(name)
  const fileName = basename(name)
  const dirName = join(config.cache.path, prefix, baseDir)

  if (!existsSync(dirName)) {
    mkdirSync(dirName, { recursive: true })
  }

  return join(dirName, fileName + suffix)
}

export function cancel() {
  clack.cancel('用户取消')
  // eslint-disable-next-line node/prefer-global/process
  process.exit(0)
}

// deepCopy
export function deepCopy(data: any) {
  return JSON.parse(JSON.stringify(data))
}
