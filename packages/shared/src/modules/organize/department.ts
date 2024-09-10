/**
 * 组织架构 - 部门列表
 */
export interface IOrganizeDepartmentList {
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
   * 更新日期
   */
  updatedTime: string
}

/**
 * 组织架构 - 部门字典
 *
 * @see {@link IOrganizeDepartmentList}
 */
export type IOrganizeDepartmentDict = Pick<
  IOrganizeDepartmentList,
  | 'id'
  | 'name'
>

/**
 * 组织架构 - 部门字典树
 *
 * @see {@link IOrganizeDepartmentList}
 */
export type IOrganizeDepartmentDictTree = Pick<
  IOrganizeDepartmentList,
  | 'id'
  | 'parentId'
  | 'name'
> & {
  children?: IOrganizeDepartmentDictTree[]
}

/**
 * 组织架构 - 部门详情
 *
 * @see {@link IOrganizeDepartmentList}
 */
export type IOrganizeDepartmentInfo = Pick<
  IOrganizeDepartmentList,
  | 'id'
  | 'parentId'
  | 'name'
  | 'desc'
  | 'sort'
>
