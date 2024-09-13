import { SystemLogLevel, SystemLogType } from '@xiaoshop/shared'

/**
 * 基础事件
 */
export interface IBaseEvent {
  /**
   * 触发模块
   */
  module: string
}

export interface ILogBasedEvent extends IBaseEvent {
  /**
   * 触发日志类型
   *
   * @see {@link SystemLogType}
   */
  type: SystemLogType
  /**
   * 触发日志级别
   *
   * @see {@link SystemLogLevel}
   */
  level: SystemLogLevel
  /**
   * 获取系统日志内容
   *
   * @returns string | false
   */
  getLogContent: () => string | false
}

/**
 * 基础事件
 *
 * @see {@link ILogBasedEvent}
 */
export abstract class LogBasedEvent implements ILogBasedEvent {
  constructor(
    /**
     * 触发模块
     */
    public readonly module: string,
    /**
     * 触发日志类型
     *
     * @see {@link SystemLogType}
     */
    public readonly type: SystemLogType = SystemLogType.USER,
    /**
     * 触发日志级别
     */
    public readonly level: SystemLogLevel = SystemLogLevel.INFO,
  ) {}

  /**
   * 获取系统日志内容
   *
   * @returns string | false
   */
  getLogContent(): string | false {
    return false
  }
}
