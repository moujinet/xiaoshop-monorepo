import { join, resolve } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'

/**
 * 创建文件夹
 *
 * @param root string
 * @param type string
 * @returns string `root`/`YYYYMM`/`DD`/`type`
 */
export function ensureDir(root: string, type: string) {
  const date = new Date()

  const month = date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : `0${date.getMonth() + 1}`
  const day = date.getDate() > 9 ? date.getDate().toString() : `0${date.getDate()}`

  const dest = join(
    root,
    `${date.getFullYear()}${month}`,
    day,
    type,
  )

  if (!existsSync(resolve(dest)))
    mkdirSync(resolve(dest), { recursive: true })

  return dest
}
