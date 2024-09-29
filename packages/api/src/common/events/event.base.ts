import { ISystemNotificationExtrasInfo, SystemLogLevel } from '@xiaoshop/shared'

export type IEventSource = 'app' | 'admin' | 'system' | 'connect'

export interface IBaseEvent {
  /**
   * 事件源
   *
   * - app: 应用操作 (小程序、H5、PC、公众号等前台操作)
   * - admin:  后台操作
   * - system: 系统任务 (定时，异步队列等)
   * - connect: 云链操作 (消息，同步等)
   */
  readonly source: IEventSource
  /**
   * 通知附加数据
   */
  readonly extras?: ISystemNotificationExtrasInfo
}

export interface ILogBasedEvent extends IBaseEvent {
  /**
   * 触发模块
   */
  readonly module: string
  /**
   * 日志等级
   */
  readonly logLevel?: SystemLogLevel

  /**
   * 获取日志内容
   */
  getLogContent: () => string | false
}
