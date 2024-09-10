import type { AuthLogType } from './constants'
import type { IAuthUserDict } from './user'

/**
 * 系统操作日志
 */
export interface IAuthLog {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 日志类型
   *
   * @see {@link AuthLogType}
   */
  type: AuthLogType
  /**
   * 操作员工
   *
   * @see {@link IAuthUserDict}
   */
  user: IAuthUserDict
  /**
   * 操作模块
   */
  module: string
  /**
   * 操作内容
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
   * 创建时间
   */
  createdTime: string
}
