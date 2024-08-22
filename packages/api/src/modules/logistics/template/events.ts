import { BaseEvent } from '~/common/events'

/**
 * 运费模板创建事件
 */
export class LogisticsTemplateCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly templateName: string,
  ) {
    super('物流发货')
  }

  getLogs() {
    return `创建运费模板 ${this.templateName}(#${this.id})`
  }
}

/**
 * 运费模板更新事件
 */
export class LogisticsTemplateUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly templateName: string,
  ) {
    super('物流发货')
  }

  getLogs() {
    return `创建运费模板 ${this.templateName}(#${this.id})`
  }
}

/**
 * 运费模板删除事件
 */
export class LogisticsTemplateDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly templateName: string,
  ) {
    super('物流发货')
  }

  getLogs() {
    return `创建运费模板 ${this.templateName}(#${this.id})`
  }
}
