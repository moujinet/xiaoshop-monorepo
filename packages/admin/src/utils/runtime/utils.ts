/**
 * 返回标准化菜单 ID
 *
 * @param id string
 * @returns string
 */
export function normalizeMenuId(id: string) {
  return id
    .replace(/#/, '')
    .replace(/\.index$/, '')
}

/**
 * 转换菜单 ID 为访问路径
 *
 * @param id string
 * @returns string
 */
export function transId2Path(id: string): string {
  const parts: string[] = id.split('.')

  if (parts[parts.length - 1] === 'index')
    parts.pop()

  return `/${parts.splice(1).join('/')}`
}
