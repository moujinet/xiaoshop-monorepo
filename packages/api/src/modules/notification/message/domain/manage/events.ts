import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/notification/constants'

/**
 * Create Notification Message Event
 */
export class NotificationMessageCreateEvent extends AdminEvent {
  constructor(
    public readonly messageId: number,
    public readonly messageName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建通知消息模板 - ${this.messageName}`
  }
}

/**
 * Update Notification Message Event
 */
export class NotificationMessageUpdateEvent extends AdminEvent {
  constructor(
    public readonly messageId: number,
    public readonly messageName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新通知消息模板 - ${this.messageName}`
  }
}

/**
 * Enable Notification Message Event
 */
export class NotificationMessageEnableEvent extends AdminEvent {
  constructor(
    public readonly messageId: number,
    public readonly messageName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `启用通知消息模板 - ${this.messageName}`
  }
}

/**
 * Disable Notification Message Event
 */
export class NotificationMessageDisableEvent extends AdminEvent {
  constructor(
    public readonly messageId: number,
    public readonly messageName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `停用通知消息模板 - ${this.messageName}`
  }
}

/**
 * Delete Notification Message Event
 */
export class NotificationMessageDeleteEvent extends AdminEvent {
  constructor(
    public readonly messageId: number,
    public readonly messageName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除通知消息模板 - ${this.messageName}`
  }
}
