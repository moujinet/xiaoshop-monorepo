import { customAlphabet } from 'nanoid'

/**
 * 生成 nanoid 数字
 *
 * @return {string}
 */
export const nanoNumber = customAlphabet('1234567890', 11)

/**
 * 生成 nanoid 字符
 *
 * @return {string}
 */
export const nanoString = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 16)

/**
 * 生成 nanoid SKU 编码
 *
 * @param index number
 * @return {string} 00ab-0000[-0]
 */
export function nanoSkuCode(index: number): string {
  const skuCode = `${nanoString(4)}-${nanoNumber(4)}`
  return index > 0 ? `${skuCode}-${index + 1}` : skuCode
}
