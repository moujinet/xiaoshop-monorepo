import type { ISystemDepartmentDict } from './department'

/**
 * 部门职位信息
 */
export interface ISystemDepartmentPositionInfo {
  /**
   * 职位 ID
   */
  id: number
  /**
   * 所属部门 ID
   */
  departmentId: ISystemDepartmentDict['id']
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
export type ISystemDepartmentPositionDict = Pick<
  ISystemDepartmentPositionInfo,
  | 'id'
  | 'name'
>

/**
 * 部门职位列表
 */
export type ISystemDepartmentPositionList = Pick<
  ISystemDepartmentPositionInfo,
  | 'id'
  | 'name'
  | 'desc'
  | 'sort'
> & {
  /**
   * 所属部门
   */
  department: ISystemDepartmentDict
  /**
   * 更新时间
   */
  updatedTime: string
}
