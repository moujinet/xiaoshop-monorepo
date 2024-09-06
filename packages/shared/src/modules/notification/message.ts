import type {
  NotificationScene,
  NotificationScope,
  NotificationStatus,
} from './constants'
import type { IMemberAccount } from '@/member'

/**
 * 系统消息通知信息
 */
export interface INotificationMessage {
  /**
   * 消息通知 ID
   */
  id: number
  /**
   * 接收会员 ID
   */
  memberId: IMemberAccount['id']
  /**
   * 消息通知范围
   *
   * @see {@link NotificationScope}
   */
  scope: NotificationScope
  /**
   * 消息场景
   *
   * @see {@link NotificationScene}
   */
  scene: NotificationScene
  /**
   * 消息通知状态
   *
   * @see {@link NotificationStatus}
   */
  status: NotificationStatus
  /**
   * 消息通知标题
   */
  title: string
  /**
   * 消息通知内容
   */
  content: string
  /**
   * 附加数据
   */
  extras: Record<string, any>
  /**
   * 发送时间
   */
  sentTime: string
}

/**
 * 系统消息通知列表
 *
 * @see {@link INotificationMessage}
 */
export type INotificationMessageListItem = Pick<
  INotificationMessage,
  | 'id'
  | 'status'
  | 'scene'
  | 'title'
  | 'content'
  | 'extras'
  | 'sentTime'
>
