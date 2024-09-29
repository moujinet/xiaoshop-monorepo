import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/system/notification/constants'

/**
 * 通知模板更新事件
 */
export class SystemNotificationTemplateUpdateEvent extends AdminEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新通知模板 ${this.templateName}`
  }
}

/**
 * 通知模板启用事件
 */
export class SystemNotificationTemplateEnableEvent extends AdminEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `启用通知模板 ${this.templateName}`
  }
}

/**
 * 通知模板停用事件
 */
export class SystemNotificationTemplateDisableEvent extends AdminEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `停用通知模板 ${this.templateName}`
  }
}
