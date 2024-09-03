import type { IOrganizeDepartmentDict } from './department'

/**
 * 组织架构 - 职位
 */
export interface IOrganizePosition {
  /**
   * 职位 ID
   */
  id: number
  /**
   * 所属部门 ID
   */
  departmentId: number
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
   * 创建日期
   */
  createdTime: string
  /**
   * 更新日期
   */
  updatedTime: string
}

/**
 * 组织架构 - 职位字典
 *
 * @see {@link IOrganizePosition}
 */
export type IOrganizePositionDict = Pick<
  IOrganizePosition,
  | 'id'
  | 'name'
>
