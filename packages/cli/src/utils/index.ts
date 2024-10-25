import * as color from 'picocolors'

/**
 * 路径化
 *
 * @param value A.B.C
 * @returns a/b/c
 */
export function toPath(value: string): string {
  return value.replace(/\./g, '/').toLowerCase()
}

/**
 * 高亮路径
 *
 * @param path 路径
 */
export function highlightPath(path: string): string {
  return path
    .trim()
    .replaceAll(process.cwd(), '.')
    .replace(/(\.\/.*\.ts)/g, color.cyan('$1'))
}
