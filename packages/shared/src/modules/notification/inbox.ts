import type { IDict } from '~/common'

/**
 * 通知信息
 */
export interface INotificationInfo {
  /**
   * 系统通知 ID
   */
  id: number
  /**
   * 通知场景
   *
   * @see {@link NotificationScene}
   */
  scene: IDict
  /**
   * 通知状态
   *
   * @see {@link NotificationStatus}
   */
  status: IDict
  /**
   * 通知标题
   */
  title: string
  /**
   * 通知内容
   */
  content: string
  /**
   * 附加数据
   */
  extras: INotificationExtrasInfo
  /**
   * 发送时间
   */
  sentTime: string
}

/**
 * 通知附加数据
 */
export interface INotificationExtrasInfo {
  /**
   * 其它数据
   */
  [key: string]: any
}

/**
 * 通知列表
 */
export type INotificationList = Pick<
  INotificationInfo,
  | 'id'
  | 'scene'
  | 'status'
  | 'title'
  | 'content'
  | 'extras'
  | 'sentTime'
>
