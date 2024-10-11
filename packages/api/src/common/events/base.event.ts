import type { SystemLogLevel } from '@xiaoshop/shared'

/**
 * 事件源
 */
export type IEventSource = 'shop' | 'system' | 'admin' | 'connect'

/**
 * 基础事件类型
 */
export interface IBaseEvent {
  /**
   * 事件源
   *
   * - `shop` 店铺事件
   * - `admin` 管理员事件
   * - `system` 系统事件
   * - `connect` 云链事件
   */
  readonly source: IEventSource
}

/**
 * 基于日志的事件
 */
export interface ILogBasedEvent extends IBaseEvent {
  /**
   * 模块名
   */
  readonly module: string
  /**
   * 日志级别
   */
  readonly level?: SystemLogLevel

  /**
   * 日志内容
   */
  get logContent(): string | false
}

/**
 * 基础事件
 */
export class BaseEvent implements IBaseEvent {
  constructor(
    readonly source: IEventSource,
  ) {}
}
