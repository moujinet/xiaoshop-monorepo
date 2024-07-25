import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import config from './config'

interface ILockfile {
  updated: number
  total: number
}

export function useLocker(): ILockfile {
  if (!existsSync(dirname(config.cache.lockfile))) {
    mkdirSync(dirname(config.cache.lockfile), { recursive: true })
  }

  if (!existsSync(config.cache.lockfile)) {
    writeFileSync(
      config.cache.lockfile,
      JSON.stringify({ updated: 0, total: 0 }),
      'utf-8',
    )

    return { updated: 0, total: 0 }
  }

  return JSON.parse(readFileSync(config.cache.lockfile, 'utf-8')) as ILockfile
}

export function updateLocker(updated: number, total: number): void {
  writeFileSync(
    config.cache.lockfile,
    JSON.stringify({ updated, total }),
    'utf-8',
  )
}
