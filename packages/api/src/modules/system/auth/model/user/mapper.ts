import type { ISystemUserDict, ISystemUserInfo, ISystemUserList } from '@xiaoshop/shared'

import { SYSTEM_USER_STATUSES } from '~/dicts/system/user'
import { objectToDict, pipeDict } from '~/utils/transformer'

import { SystemUserEntity } from './entity'

/**
 * 将系统用户列表转换为字典
 *
 * @param users 用户列表
 * @returns 处理后的用户列表
 */
export function toSystemUserList(users: SystemUserEntity[]) {
  return pipeDict<ISystemUserList>(users, [
    user => objectToDict(user, 'status', SYSTEM_USER_STATUSES),
  ])
}

/**
 * 将系统用户转换为字典
 *
 * @param user 用户信息
 * @returns 处理后的用户信息
 */
export function toSystemUserInfo(user: SystemUserEntity) {
  return objectToDict(user, 'status', SYSTEM_USER_STATUSES) as ISystemUserInfo
}

/**
 * 将系统用户转换为字典
 *
 * @param users 用户信息
 * @returns 处理后的用户信息
 */
export function toSystemUserDictList(users: SystemUserEntity[]) {
  return pipeDict<ISystemUserDict>(users, [
    user => objectToDict(user, 'status', SYSTEM_USER_STATUSES),
  ])
}
