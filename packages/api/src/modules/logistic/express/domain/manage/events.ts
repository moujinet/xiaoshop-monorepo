import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/logistic/constants'

/**
 * Create Logistic Express Event
 */
export class LogisticExpressCreateEvent extends AdminEvent {
  constructor(
    public readonly expressId: number,
    public readonly expressName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建快递公司 - ${this.expressName}`
  }
}

/**
 * Update Logistic Express Event
 */
export class LogisticExpressUpdateEvent extends AdminEvent {
  constructor(
    public readonly expressId: number,
    public readonly expressName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新快递公司 - ${this.expressName}`
  }
}

/**
 * Delete Logistic Express Event
 */
export class LogisticExpressDeleteEvent extends AdminEvent {
  constructor(
    public readonly expressId: number,
    public readonly expressName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除快递公司 - ${this.expressName}`
  }
}
