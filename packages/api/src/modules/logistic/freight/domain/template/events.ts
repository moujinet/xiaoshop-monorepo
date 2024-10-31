import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/logistic/constants'

/**
 * Create Logistic Freight Template Event
 */
export class LogisticFreightTemplateCreateEvent extends AdminEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建运费模板 - ${this.templateName}`
  }
}

/**
 * Update Logistic Freight Template Event
 */
export class LogisticFreightTemplateUpdateEvent extends AdminEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新运费模板 - ${this.templateName}`
  }
}

/**
 * Delete Logistic Freight Template Event
 */
export class LogisticFreightTemplateDeleteEvent extends AdminEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除运费模板 - ${this.templateName}`
  }
}
