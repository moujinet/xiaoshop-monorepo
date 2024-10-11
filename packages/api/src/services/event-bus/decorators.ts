import { OnEvent as BaseOnEvent } from '@nestjs/event-emitter'

import { toEventName } from './helpers'

/**
 * 监听事件
 *
 * @param event 事件类
 * @returns MethodDecorator
 */
export function OnEvent(event: any): MethodDecorator {
  const eventName = typeof event === 'string'
    ? event
    : toEventName(event.name)

  return BaseOnEvent(eventName, { async: true })
}
