import { BaseEvent } from '~/common/events'

/**
 * 物流公司创建事件
 */
export class LogisticsCompanyCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly companyName: string,
  ) {
    super('物流发货')
  }

  getLogs() {
    return `创建物流公司 ${this.companyName}(#${this.id})`
  }
}

/**
 * 物流公司更新事件
 */
export class LogisticsCompanyUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly companyName: string,
  ) {
    super('物流发货')
  }

  getLogs() {
    return `创建物流公司 ${this.companyName}(#${this.id})`
  }
}

/**
 * 物流公司删除事件
 */
export class LogisticsCompanyDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly companyName: string,
  ) {
    super('物流发货')
  }

  getLogs() {
    return `创建物流公司 ${this.companyName}(#${this.id})`
  }
}
