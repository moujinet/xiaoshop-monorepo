import { SystemLogLevel } from '@xiaoshop/shared'

import {
  BaseEvent,
  type ILogBasedEvent,
} from './base.event'

/**
 * 云链事件
 */
export abstract class ConnectEvent extends BaseEvent implements ILogBasedEvent {
  constructor(
    readonly module: string,
    readonly level: SystemLogLevel = SystemLogLevel.INFO,
  ) {
    super('connect')
  }

  get logContent(): string | false {
    return false
  }
}
