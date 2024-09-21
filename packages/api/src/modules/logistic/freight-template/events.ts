import { LogBasedEvent } from '~/common/events'

import { MODULE_NAME } from '../constants'

/**
 * 运费模板创建事件
 */
export class LogisticFreightTemplateCreateEvent extends LogBasedEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建运费模板 ${this.templateName}`
  }
}

/**
 * 运费模板更新事件
 */
export class LogisticFreightTemplateUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新运费模板 ${this.templateName}`
  }
}

/**
 * 运费模板删除事件
 */
export class LogisticFreightTemplateDeleteEvent extends LogBasedEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除运费模板 ${this.templateName}`
  }
}
