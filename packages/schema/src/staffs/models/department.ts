/**
 * 组织部门
 */
export interface IStaffDepartment {
  /**
   * 部门 ID
   */
  id: number
  /**
   * 上级部门 ID
   */
  parentId: IStaffDepartment['id']
  /**
   * 部门名称
   */
  name: string
  /**
   * 部门描述
   */
  desc: string
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
 * 组织部门树
 */
export interface IStaffDepartmentTreeItem extends IStaffDepartment {
  children: IStaffDepartmentTreeItem[]
}

/**
 * 字典 - 组织部门 - 基本信息
 */
export type IStaffDepartmentDict = Pick<IStaffDepartment, 'id' | 'name'>
