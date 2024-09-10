import type { AuthUserStatus } from './constants'
import type { IAuthRolePermissions } from './role'
import type { IOrganizeDepartmentDict, IOrganizePositionDict } from '@/organize'
import type { YesOrNo } from '~/common'

/**
 * 员工账号
 */
export interface IAuthUserList {
  /**
   * 员工 ID
   */
  id: number
  /**
   * 是否管理员  (N: 否; Y: 是)
   *
   * @see {@link YesOrNo}
   */
  isAdmin: YesOrNo
  /**
   * 员工状态
   *
   * @see {@link AuthUserStatus}
   */
  status: AuthUserStatus
  /**
   * 员工角色
   *
   * @see {@link IAuthRolePermissions}
   */
  roles: IAuthRolePermissions[]
  /**
   * 员工账号
   */
  username: string
  /**
   * 员工姓名
   */
  name: string
  /**
   * 员工手机
   */
  mobile: string
  /**
   * 所属部门
   *
   * @see {@link IOrganizeDepartmentDict}
   */
  department: IOrganizeDepartmentDict
  /**
   * 所属职位
   *
   * @see {@link IOrganizePositionDict}
   */
  position: IOrganizePositionDict
  /**
   * 最后登录日期
   */
  lastLoginTime: string
}

/**
 * 员工账号 - 登录口令
 */
export interface IAuthUserToken {
  /**
   * 登录口令
   */
  token: string
}

/**
 * 员工账号 - 档案详情
 *
 * @see {@link IAuthUserList}
 */
export type IAuthUserInfo = Pick<
  IAuthUserList,
  | 'id'
  | 'isAdmin'
  | 'status'
  | 'roles'
  | 'username'
  | 'name'
  | 'mobile'
  | 'department'
  | 'position'
  | 'lastLoginTime'
>

/**
 * 员工账号 - 字典
 *
 * @see {@link IAuthUserList}
 */
export type IAuthUserDict = Pick<
  IAuthUserList,
  | 'id'
  | 'isAdmin'
  | 'status'
  | 'name'
>

/**
 * 员工账号 - 锁定信息(仅管理员)
 */
export type IAuthUserLockedInfo = Pick<
  IAuthUserList,
  | 'id'
  | 'name'
> & {
  /**
   * 锁定日期
   */
  lockedTime: string
}

/**
 * 员工账号 - 口令签发装填内容
 */
export interface IAuthUserLoginPayload {
  /**
   * 登录范围
   */
  scope: string
  /**
   * 登录用户
   *
   * @see {@link IAuthUserInfo}
   */
  user: IAuthUserInfo
}
