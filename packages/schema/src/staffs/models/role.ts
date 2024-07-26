/**
 * 员工角色
 */
export interface IStaffRole {
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
 * 员工角色 - 基本信息
 */
export type IStaffRoleInfo = Pick<IStaffRole, 'id' | 'name' | 'permissions'>

/**
 * 字典 - 员工角色
 */
export type IStaffRoleDict = Pick<IStaffRole, 'id' | 'name'>
