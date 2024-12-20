import type { IDict, YesOrNo } from '~/common'
import type { ISystemRoleDict, ISystemRolePermissions } from '@/system/auth/role'

/**
 * 系统用户信息
 */
export interface ISystemUserInfo {
  /**
   * 系统用户 ID
   */
  id: number
  /**
   * 是否系统管理员
   *
   * @see {@link YesOrNo}
   */
  isAdmin: YesOrNo
  /**
   * 系统用户状态
   *
   * @see {@link SystemUserStatus}
   */
  status: IDict
  /**
   * 用户名
   */
  username: string
  /**
   * 真实姓名
   */
  name: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 系统角色
   *
   * 最多同时拥有 2 个系统角色
   */
  roles: ISystemRolePermissions[]
}

/**
 * 系统用户额外信息
 */
export interface ISystemUserExtraInfo {
  /**
   * 最后登录 IP 及地区
   *
   * @example 89.0.142.86|上海
   */
  lastLoginIp: string
  /**
   * 最后登录时间
   */
  lastLoginTime: string
  /**
   * 最后锁定 IP 及地区
   */
  lastLockedIp: string
  /**
   * 锁定日期
   */
  lockedTime: string
}

/**
 * 系统用户列表
 */
export type ISystemUserList = Pick<
  ISystemUserInfo,
  | 'id'
  | 'isAdmin'
  | 'status'
  | 'username'
  | 'name'
  | 'mobile'
>
& ISystemUserExtraInfo
& {
  /**
   * 系统角色
   */
  roles: ISystemRoleDict[]
}

/**
 * 系统用户字典
 */
export type ISystemUserDict = Pick<
  ISystemUserInfo,
  | 'id'
  | 'isAdmin'
  | 'status'
  | 'name'
>

/**
 * 系统用户公开信息
 */
export type ISystemUserPublicInfo = Pick<
  ISystemUserInfo,
  | 'id'
  | 'name'
  | 'username'
  | 'mobile'
>
