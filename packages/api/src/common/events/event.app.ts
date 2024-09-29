import type { IBaseEvent, IEventSource } from './event.base'

/**
 * 应用端事件基类
 */
export abstract class AppEvent implements IBaseEvent {
  /**
   * 事件源
   */
  readonly source: IEventSource = 'app'
}
