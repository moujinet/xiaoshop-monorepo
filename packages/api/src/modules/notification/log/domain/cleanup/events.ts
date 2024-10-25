import { SystemEvent } from '~/common/events'
import { MODULE_NAME } from '@/notification/constants'

/**
 * Cleanup Notification Log Event
 */
export class NotificationLogCleanupEvent extends SystemEvent {
  constructor(
    public readonly beforeDays: number,
    public readonly results: number,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `自动清理 ${this.beforeDays} 天前的通知消息发送日志 - 共计 ${this.results} 条`
  }
}
