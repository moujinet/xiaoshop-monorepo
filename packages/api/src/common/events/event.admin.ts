import type { SystemLogLevel } from '@xiaoshop/shared'

import type { IEventSource, ILogBasedEvent } from './event.base'

/**
 * 管理端事件基类
 */
export abstract class AdminEvent implements ILogBasedEvent {
  /**
   * 事件源
   */
  readonly source: IEventSource = 'admin'

  constructor(
    /**
     * 触发模块
     */
    public readonly module: string,
    /**
     * 日志等级
     */
    public readonly logLevel?: SystemLogLevel,
  ) {}

  /**
   * 获取日志内容
   */
  getLogContent(): string | false {
    return false
  }
}
