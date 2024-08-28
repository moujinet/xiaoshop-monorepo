import { BaseEvent } from '~/common/events'

/**
 * 系统设置更新事件
 */
export class SettingsUpdatedEvent extends BaseEvent {
  constructor(
    public readonly key: string,
    public readonly value: string,
  ) {
    super('系统设置')
  }

  getAuthLogs() {
    return `更新系统设置 ${this.key} = ${this.value}`
  }
}
