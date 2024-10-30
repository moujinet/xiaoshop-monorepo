import type { ILocationPath } from '~/common'

/**
 * 合并地区路径
 *
 * @param path 地区路径
 * @param separator 分隔符
 * @returns 合并后的字符串
 */
export function stringifyLocation(path: ILocationPath, separator = ''): string {
  return path.map(p => p.name).join(separator)
}
