import type { IDepartmentDict } from './department'

/**
 * 部门职位信息
 */
export interface IDepartmentPositionInfo {
  /**
   * 职位 ID
   */
  id: number
  /**
   * 所属部门 ID
   */
  departmentId: IDepartmentDict['id']
  /**
   * 职位名称
   */
  name: string
  /**
   * 职位描述
   */
  desc: string
  /**
   * 排序
   */
  sort: number
}

/**
 * 部门职位字典
 */
export type IDepartmentPositionDict = Pick<
  IDepartmentPositionInfo,
  | 'id'
  | 'name'
>

/**
 * 部门职位列表
 */
export type IDepartmentPositionList = Pick<
  IDepartmentPositionInfo,
  | 'id'
  | 'name'
  | 'desc'
  | 'sort'
> & {
  /**
   * 所属部门
   */
  department: IDepartmentDict
  /**
   * 更新时间
   */
  updatedTime: string
}
