import type { IOrganizeDepartmentDict } from './department'

/**
 * 组织职位列表
 */
export interface IOrganizePositionList {
  /**
   * 职位 ID
   */
  id: number
  /**
   * 所属部门
   *
   * @see {@link IOrganizeDepartmentDict}
   */
  department: IOrganizeDepartmentDict
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
  /**
   * 更新日期
   */
  updatedTime: string
}

/**
 * 组织职位信息
 *
 * @see {@link IOrganizePositionList}
 */
export type IOrganizePositionInfo = Pick<
  IOrganizePositionList,
  | 'id'
  | 'name'
  | 'desc'
  | 'sort'
> & {
  /**
   * 所属部门 ID
   */
  departmentId: IOrganizePositionList['department']['id']
}

/**
 * 组织职位字典
 *
 * @see {@link IOrganizePositionList}
 */
export type IOrganizePositionDict = Pick<
  IOrganizePositionList,
  | 'id'
  | 'name'
>
