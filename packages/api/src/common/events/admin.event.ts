import { SystemLogLevel } from '@xiaoshop/shared'

import {
  BaseEvent,
  type ILogBasedEvent,
} from './base.event'

/**
 * 管理员事件
 */
export abstract class AdminEvent extends BaseEvent implements ILogBasedEvent {
  constructor(
    readonly module: string,
    readonly level: SystemLogLevel = SystemLogLevel.INFO,
  ) {
    super('admin')
  }

  get logContent(): string | false {
    return false
  }
}
