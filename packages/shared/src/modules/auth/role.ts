/**
 * 员工角色
 */
export interface IAuthRoleInfo {
  /**
   * 角色 ID
   */
  id: number
  /**
   * 角色名称
   */
  name: string
  /**
   * 角色描述
   */
  desc: string
  /**
   * 角色权限
   */
  permissions: string[]
  /**
   * 排序
   */
  sort: number
}

/**
 * 员工角色 - 列表
 *
 * @see {@link IAuthRoleInfo}
 */
export type IAuthRoleList = Pick<
  IAuthRoleInfo,
  | 'id'
  | 'name'
  | 'desc'
  | 'sort'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 员工角色 - 字典信息
 *
 * @see {@link IAuthRoleInfo}
 */
export type IAuthRoleDict = Pick<
  IAuthRoleInfo,
  | 'id'
  | 'name'
>

/**
 * 员工角色 - 权限信息
 *
 * @see {@link IAuthRoleInfo}
 */
export type IAuthRolePermissions = Pick<
  IAuthRoleInfo,
  | 'id'
  | 'name'
  | 'permissions'
>
