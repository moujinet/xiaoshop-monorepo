import type { IDict } from '~/common'

/**
 * 系统通知信息
 */
export interface ISystemNotificationInfo {
  /**
   * 系统通知 ID
   */
  id: number
  /**
   * 通知场景
   *
   * @see {@link SystemNotificationScene}
   */
  scene: IDict
  /**
   * 通知状态
   *
   * @see {@link SystemNotificationStatus}
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
  extras?: ISystemNotificationExtrasInfo
  /**
   * 发送时间
   */
  sentTime: string
}

/**
 * 附加数据
 */
export interface ISystemNotificationExtrasInfo {
  /**
   * 会员 ID
   */
  memberId?: number
  /**
   * 会员昵称
   */
  memberName?: string
  /**
   * 通知封面图片
   */
  cover?: string
  /**
   * 订单 ID
   */
  orderId?: number
  /**
   * 其它数据
   */
  [key: string]: any
}

/**
 * 系统通知列表
 */
export type ISystemNotificationList = Pick<
  ISystemNotificationInfo,
  | 'id'
  | 'scene'
  | 'status'
  | 'title'
  | 'content'
  | 'extras'
  | 'sentTime'
>
