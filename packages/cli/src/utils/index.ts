/**
 * 路径化
 *
 * @param value A.B.C
 * @returns a/b/c
 */
export function toPath(value: string): string {
  return value.replace(/\./g, '/').toLowerCase()
}
