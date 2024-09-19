import { LogBasedEvent } from '~/common/events'
import { MODULE_NAME } from '@/system/message/constants'

/**
 * 消息模板更新事件
 */
export class SystemMessageTemplateUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新消息模板 ${this.templateName}`
  }
}

/**
 * 消息模板启用事件
 */
export class SystemMessageTemplateEnableEvent extends LogBasedEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `启用消息模板 ${this.templateName}`
  }
}

/**
 * 消息模板停用事件
 */
export class SystemMessageTemplateDisableEvent extends LogBasedEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `停用消息模板 ${this.templateName}`
  }
}
