import { LogBasedEvent } from '~/common/events'

import { MODULE_NAME } from './constants'

/**
 * 系统设置更新事件
 */
export class SystemSettingsUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly key: string,
    public readonly value: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新系统设置 ${this.key}: ${this.value}`
  }
}
