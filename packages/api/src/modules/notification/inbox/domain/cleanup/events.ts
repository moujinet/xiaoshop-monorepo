import { SystemEvent } from '~/common/events'
import { MODULE_NAME } from '@/notification/constants'

/**
 * Cleanup Notification Inbox Event
 */
export class NotificationInboxCleanupEvent extends SystemEvent {
  constructor(
    public readonly beforeDays: number,
    public readonly results: number,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `自动清理 ${this.beforeDays} 天前的历史通知消息 - 共计 ${this.results} 条`
  }
}
