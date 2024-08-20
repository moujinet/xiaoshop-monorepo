/**
 * 组织架构 - 部门
 */
export interface IOrganizeDepartment {
  /**
   * 部门 ID
   */
  id: number
  /**
   * 上级部门 ID
   */
  parentId: number
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
 * 组织架构 - 部门树
 *
 * @see {@link IOrganizeDepartment}
 */
export interface IOrganizeDepartmentTreeItem extends IOrganizeDepartment {
  children?: IOrganizeDepartmentTreeItem[]
}

/**
 * 组织架构 - 部门字典
 *
 * @see {@link IOrganizeDepartment}
 */
export type IOrganizeDepartmentDict = Pick<IOrganizeDepartment, 'id' | 'name'>

/**
 * 组织架构 - 部门字典树
 *
 * @see {@link IOrganizeDepartment}
 */
export type IOrganizeDepartmentDictTreeItem = Pick<IOrganizeDepartment, 'id' | 'parentId' | 'name'> & {
  children?: IOrganizeDepartmentDictTreeItem[]
}
