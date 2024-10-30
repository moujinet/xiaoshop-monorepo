import { v4 as uuid } from 'uuid'
import { customAlphabet } from 'nanoid'

export { uuid }

/**
 * 生成 nanoid 数字
 *
 * @return {string}
 */
export const nano = customAlphabet('1234567890', 11)

/**
 * 生成 nanoid 字符
 *
 * @return {string}
 */
export const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 16)
