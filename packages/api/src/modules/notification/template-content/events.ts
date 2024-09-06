import {
  NOTIFICATION_CHANNELS,
  type NotificationChannel,
} from '@xiaoshop/shared'
import { BaseEvent } from '~/common/events'

/**
 * 消息模板内容更新事件
 */
export class NotificationTemplateContentUpdatedEvent extends BaseEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
    public readonly channel: NotificationChannel,
  ) {
    super('消息通知')
  }

  getAuthLogs() {
    const channel = NOTIFICATION_CHANNELS.find(
      c => c.value === this.channel,
    )?.label || ''

    return `更新${this.templateName}${channel}模板内容 (${this.templateId})`
  }
}
