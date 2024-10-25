import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/notification/constants'

/**
 * Update Notification Seller Subscriber Event
 */
export class NotificationSellerSubscriberUpdateEvent extends AdminEvent {
  constructor(
    public readonly messageId: number,
    public readonly subscriberIds: number[],
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新通知订阅者 - ${this.subscriberIds.join(',')}`
  }
}
