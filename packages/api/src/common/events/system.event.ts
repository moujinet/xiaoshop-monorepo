import { SystemLogLevel } from '@xiaoshop/shared'

import {
  BaseEvent,
  type ILogBasedEvent,
} from './base.event'

/**
 * 系统事件
 */
export abstract class SystemEvent extends BaseEvent implements ILogBasedEvent {
  constructor(
    readonly module: string,
    readonly level: SystemLogLevel = SystemLogLevel.INFO,
  ) {
    super('system')
  }

  get logContent(): string | false {
    return false
  }
}
