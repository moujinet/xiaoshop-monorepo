import { customAlphabet } from 'nanoid'

/**
 * 生成 nanoid
 *
 * @return {string}
 */
export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz', 32)

/**
 * 生成 nanoid 数字
 *
 * @return {string}
 */
export const nanoNumber = customAlphabet('123456789_', 12)

/**
 * 生成 nanoid Token
 *
 * @return {string}
 */
export const nanoToken = customAlphabet('0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ=abcdefghijklmnopqrstuvwxyz', 48)
