import { join, resolve, sep } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'

import { localNow } from './formatter'

/**
 * 创建本地文件夹
 *
 * @param root 根目录
 * @param type 类别目录
 * @returns 完整的目录 (`type/YYYYMM/DD`)
 */
export function ensureLocalDir(
  root: string,
  type: string,
): string {
  const date = localNow(`YYYYMM${sep}DD`)
  const dir = join(type, date)

  if (!existsSync(dir))
    mkdirSync(resolve(join(root, dir)), { recursive: true })

  return dir
}
