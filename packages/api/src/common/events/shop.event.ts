import { SystemLogLevel } from '@xiaoshop/shared'

import {
  BaseEvent,
  type ILogBasedEvent,
} from './base.event'

/**
 * 店铺事件
 */
export abstract class ShopEvent extends BaseEvent implements ILogBasedEvent {
  constructor(
    readonly module: string,
    readonly level: SystemLogLevel = SystemLogLevel.INFO,
  ) {
    super('shop')
  }

  get logContent(): string | false {
    return false
  }
}
