import { YesOrNo } from '@xiaoshop/shared'
import { BaseEvent } from '~/common/events'

/**
 * 消息通知模板 - 启用/禁用事件
 */
export class NotificationTemplateStatusUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly key: string,
    public readonly templateName: string,
    public readonly enable: YesOrNo,
  ) {
    super('消息通知')
  }

  getAuthLogs() {
    const status = this.enable === YesOrNo.YES ? '启用' : '禁用'

    return `${status}消息通知模板 ${this.templateName} (${this.key})`
  }
}
