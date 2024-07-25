import type { IStaffLogType } from '@/staffs/types'
import type { IStaffAccountInfo } from '@/staffs/models/account'

/**
 * 员工日志 - 额外信息
 */
export interface IStaffLogExtra {
  /**
   * 操作系统
   */
  os: string
  /**
   * 浏览器
   */
  ua: string
  /**
   * IP
   */
  ip: string
}

/**
 * 员工日志
 */
export interface IStaffLog {
  /**
   * 日志编号
   */
  id: number
  /**
   * 日志类型
   *
   * @see {@link IStaffLogType}
   */
  type: IStaffLogType
  /**
   * 员工信息
   *
   * @see {@link IStaffAccountInfo}
   */
  staff: IStaffAccountInfo
  /**
   * 日志操作
   */
  action: string
  /**
   * 日志内容
   */
  content: string
  /**
   * 额外信息
   *
   * @see {@link IStaffLogExtra}
   */
  extra: IStaffLogExtra
  /**
   * 创建时间
   */
  createdTime: string
}
