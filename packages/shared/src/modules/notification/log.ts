import type { IDict } from '~/common'

/**
 * 通知发送日志信息
 */
export interface INotificationLogInfo {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 通知类型
   *
   * @see {@link NotificationType}
   */
  type: IDict
  /**
   * 通知场景
   *
   * @see {@link NotificationScene}
   */
  scene: IDict
  /**
   * 发送通道
   *
   * @see {@link NotificationChannel}
   */
  channel: IDict
  /**
   * 订阅者
   *
   * - `NotificationChannel.SYSTEM` - (买家: username,  商家: name)
   * - `NotificationChannel.SMS`    - (买家: mobile,    商家: mobile)
   * - `NotificationChannel.WECHAT` - (买家: openid)
   */
  subscriber: string
  /**
   * 通知标题
   */
  title: string
  /**
   * 通知内容
   */
  content: string
  /**
   * 发送状态
   *
   * @see {@link NotificationSendStatus}
   */
  status: IDict
  /**
   * 发送结果
   */
  result: string
  /**
   * 发送时间
   */
  sentTime: string
}

/**
 * 通知发送日志列表
 */
export type INotificationLogList = Pick<
  INotificationLogInfo,
  | 'id'
  | 'type'
  | 'scene'
  | 'channel'
  | 'subscriber'
  | 'title'
  | 'status'
  | 'sentTime'
>
