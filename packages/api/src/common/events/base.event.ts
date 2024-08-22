import {
  AuthLogType,
  type IAuthLogType,
} from '@xiaoshop/shared'

export interface ILogBasedEvent {
  /**
   * 事件所属模块
   */
  module: string
  /**
   * 事件日志类型
   *
   * @see {@link AuthLogType}
   */
  type: IAuthLogType
  /**
   * 获取日志内容
   *
   * @returns string | false
   */
  getLogs: () => string | false
}

/**
 * 基础事件
 *
 * @see {@link ILogBasedEvent}
 */
export abstract class BaseEvent implements ILogBasedEvent {
  constructor(
    /**
     * 事件所属模块
     */
    public readonly module: string,
    /**
     * 事件日志类型
     *
     * @see {@link AuthLogType}
     */
    public readonly type: IAuthLogType = AuthLogType.USER,
  ) {}

  /**
   * 获取日志内容
   *
   * @returns string | false
   */
  getLogs(): string | false {
    return false
  }
}
