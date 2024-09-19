/**
 * 部门信息
 */
export interface ISystemDepartmentInfo {
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
export type ISystemDepartmentNestedList = Pick<
  ISystemDepartmentInfo,
  | 'id'
  | 'parentId'
  | 'name'
  | 'desc'
  | 'sort'
> & {
  /**
   * 下级部门
   */
  children?: ISystemDepartmentNestedList[]
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 部门字典
 */
export type ISystemDepartmentDict = Pick<
  ISystemDepartmentInfo,
  | 'id'
  | 'name'
>

/**
 * 部门字典
 */
export type ISystemDepartmentRootDict = ISystemDepartmentInfo

/**
 * 部门字典
 */
export type ISystemDepartmentNestedDict = ISystemDepartmentDict
  & Pick<ISystemDepartmentInfo, | 'parentId'>
  & {
    /**
     * 下级部门
     */
    children?: ISystemDepartmentNestedDict[]
  }
