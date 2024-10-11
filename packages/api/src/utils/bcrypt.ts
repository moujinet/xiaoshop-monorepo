import * as bcrypt from 'bcrypt'

import {
  BCRYPT_SALT_MINOR,
  BCRYPT_SALT_ROUNDS,
} from '~/common/constants/bcrypt.constant'

/**
 * 生成 bcrypt 盐值
 *
 * @returns bcrypt 盐值
 */
export async function generateSalt(): Promise<string> {
  return await bcrypt.genSalt(
    BCRYPT_SALT_ROUNDS,
    BCRYPT_SALT_MINOR,
  )
}

/**
 * 加密密码
 *
 * @param password 密码
 * @param salt 盐值
 * @returns 加密后的密码
 */
export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return await bcrypt.hash(password, salt)
}

/**
 * 比较密码
 *
 * @param password 密码
 * @param encrypted 加密后的密码
 * @returns 是否相同
 */
export async function comparePassword(
  password: string,
  encrypted: string,
): Promise<boolean> {
  return await bcrypt.compare(password, encrypted)
}
