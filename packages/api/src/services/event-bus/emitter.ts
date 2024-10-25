import type { IBaseEvent } from '~/common/events'

import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { toEventName } from './helpers'

@Injectable()
export class EventBusEmitter {
  constructor(
    @Inject(EventEmitter2)
    private readonly emitter: EventEmitter2,
  ) {}

  /**
   * 触发事件
   *
   * @param event 事件
   */
  emit(event: IBaseEvent) {
    return this.emitter.emit(
      toEventName(event.constructor.name),
      event,
    )
  }
}
