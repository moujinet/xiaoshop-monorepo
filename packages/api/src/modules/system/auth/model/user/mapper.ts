import type { ISystemUserInfo, ISystemUserList } from '@xiaoshop/shared'

import { SYSTEM_USER_STATUSES } from '~/dicts/system/user'
import { objectToDict, pipeDict } from '~/utils/transformer'

import { SystemUserEntity } from './entity'

export class SystemUserMapper {
  /**
   * 将系统用户列表转换为字典
   *
   * @param users 用户列表
   * @returns 处理后的用户列表
   */
  static toSystemUserList(users: SystemUserEntity[]) {
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
  static toSystemUserInfo(user: SystemUserEntity) {
    return objectToDict(user, 'status', SYSTEM_USER_STATUSES) as ISystemUserInfo
  }
}
