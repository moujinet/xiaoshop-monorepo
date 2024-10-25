/**
 * 系统角色信息
 */
export interface ISystemRoleInfo {
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
   * 角色权限 (JSON)
   */
  permissions: string[]
  /**
   * 排序
   */
  sort: number
}

/**
 * 系统角色列表
 */
export type ISystemRoleList = Pick<
  ISystemRoleInfo,
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
 * 系统角色权限
 */
export type ISystemRolePermissions = Pick<
  ISystemRoleInfo,
  | 'name'
  | 'permissions'
>

/**
 * 系统角色字典
 */
export type ISystemRoleDict = Pick<
  ISystemRoleInfo,
  | 'id'
  | 'name'
>
