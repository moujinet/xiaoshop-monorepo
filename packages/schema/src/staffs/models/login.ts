import type { IStaffAccount } from './account'

/**
 * 员工账号 - 登录口令
 */
export interface IStaffLoginToken {
  /**
   * 登录口令
   */
  token: string
}

/**
 * 员工账号 - 登录
 */
export type IStaffLoginProfile = Pick<
  IStaffAccount,
  | 'id'
  | 'username'
  | 'name'
  | 'isAdmin'
  | 'roles'
  | 'department'
  | 'position'
>
