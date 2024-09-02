/**
 * 数组去重
 *
 * @param arr array
 * @returns array
 */
export function unique<T = any>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}
