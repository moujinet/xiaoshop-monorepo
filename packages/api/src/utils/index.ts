/**
 * 数组去重
 *
 * @param arr array
 * @returns array
 */
export function unique<T = any>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

/**
 * 替换字符串中的变量
 *
 * @example `replaceVariables('Hello #{name}', { name: 'xiaoshop' })`
 * @param str string
 * @param obj object
 * @returns string
 */
export function replaceVariables(str: string, obj: Record<string, any>) {
  return str.replace(/#\{([^}]+)\}/g, (_, key) => obj[key] || '')
}
