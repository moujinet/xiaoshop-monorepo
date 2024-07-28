import { customAlphabet } from 'nanoid'

/**
 * 生成 nanoid
 *
 * @return {string}
 */
export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz', 32)

/**
 * 生成 nanoid 数字
 *
 * @return {string}
 */
export const nanoNumber = customAlphabet('1234567890', 10)

/**
 * 生成 nanoid 字符
 *
 * @return {string}
 */
export const nanoString = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

/**
 * 生成 nanoid Token
 *
 * @return {string}
 */
export const nanoToken = customAlphabet('0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ=abcdefghijklmnopqrstuvwxyz', 48)

/**
 * 生成 nanoid skuCode
 *
 * @returns {string} 0000-0000(-00ab)
 */
export function nanoSkuCode(prefix?: string): string {
  return prefix ? `${prefix}-${nanoString(4)}` : `${nanoNumber(4)}-${nanoNumber(4)}`
}
