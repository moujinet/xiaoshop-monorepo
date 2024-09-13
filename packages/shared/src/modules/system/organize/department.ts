/**
 * 部门信息
 */
export interface IDepartmentInfo {
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
}

/**
 * 部门嵌套列表
 */
export type IDepartmentNestedList = Pick<
  IDepartmentInfo,
  | 'id'
  | 'name'
  | 'desc'
  | 'sort'
> & {
  /**
   * 下级部门
   */
  children?: IDepartmentNestedList[]
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 部门字典
 */
export type IDepartmentDict = Pick<
  IDepartmentInfo,
  | 'id'
  | 'name'
>
