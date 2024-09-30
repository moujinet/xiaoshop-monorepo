import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/logistic/constants'

/**
 * 物流公司创建事件
 */
export class LogisticExpressCreateEvent extends AdminEvent {
  constructor(
    public readonly expressId: number,
    public readonly expressName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建物流公司 ${this.expressName}`
  }
}

/**
 * 物流公司更新事件
 */
export class LogisticExpressUpdateEvent extends AdminEvent {
  constructor(
    public readonly expressId: number,
    public readonly expressName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新物流公司 ${this.expressName}`
  }
}

/**
 * 物流公司删除事件
 */
export class LogisticExpressDeleteEvent extends AdminEvent {
  constructor(
    public readonly expressId: number,
    public readonly expressName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除物流公司 ${this.expressName}`
  }
}
