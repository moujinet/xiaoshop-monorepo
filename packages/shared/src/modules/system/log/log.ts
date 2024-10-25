import type { IDict } from '~/common'
import type { ISystemUserDict } from '@/system/auth'

/**
 * 系统日志列表
 */
export interface ISystemLogList {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 日志类型
   *
   * @see {@link SystemLogType}
   */
  type: IDict
  /**
   * 日志级别
   *
   * @see {@link SystemLogLevel}
   */
  level: IDict
  /**
   * 日志模块
   */
  module: string
  /**
   * 操作用户
   */
  user: ISystemUserDict
  /**
   * 日志内容
   */
  content: string
  /**
   * 操作设备
   *
   * - format: [os] | [browser]
   */
  device: string
  /**
   * 操作 IP
   */
  ip: string
  /**
   * 操作时间
   */
  createdTime: string
}
