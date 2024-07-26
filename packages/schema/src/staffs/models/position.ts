import type { IStaffDepartmentDict } from '@/staffs/models/department'

/**
 * 组织职位
 */
export interface IStaffPosition {
  /**
   * 职位 ID
   */
  id: number
  /**
   * 所属部门
   *
   * @type {IStaffDepartmentDict}
   */
  department: IStaffDepartmentDict
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
 * 字典 - 组织职位 - 基本信息
 */
export type IStaffPositionDict = Pick<IStaffPosition, 'id' | 'name'>
