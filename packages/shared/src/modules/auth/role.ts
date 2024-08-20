/**
 * 员工角色
 */
export interface IAuthRole {
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
  /**
   * 创建日期
   */
  createdTime: string
  /**
   * 更新日期
   */
  updatedTime: string
}

/**
 * 员工角色 - 列表
 *
 * @see {@link IAuthRole}
 */
export type IAuthRoleListItem = Omit<IAuthRole, 'permissions' | 'createdTime'>

/**
 * 员工角色 - 字典信息
 *
 * @see {@link IAuthRole}
 */
export type IAuthRoleDict = Pick<IAuthRole, 'id' | 'name'>

/**
 * 员工角色 - 权限信息
 *
 * @see {@link IAuthRole}
 */
export type IAuthRolePermissions = Pick<IAuthRole, 'id' | 'name' | 'permissions'>
