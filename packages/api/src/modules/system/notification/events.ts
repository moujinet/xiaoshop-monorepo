import type {
  SystemNotificationChannel,
  SystemNotificationSendStatus,
} from '@xiaoshop/shared'

import { SystemEvent } from '~/common/events'

import { MODULE_NAME } from './constants'
import { SystemNotificationPayload } from './notification/dto/payload'

/**
 * 系统消息发送事件
 */
export class SystemNotificationSentEvent extends SystemEvent {
  constructor(
    public readonly templateId: number,
    public readonly channel: SystemNotificationChannel,
    public readonly sendTo: string,
    public readonly notice: SystemNotificationPayload,
    public readonly result: string,
    public readonly status: SystemNotificationSendStatus,
  ) {
    super(MODULE_NAME)
  }
}
