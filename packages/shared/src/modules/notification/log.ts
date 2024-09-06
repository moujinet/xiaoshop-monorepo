import type {
  NotificationChannel,
  NotificationScene,
  NotificationScope,
  NotificationSendStatus,
} from './constants'
import type { INotificationTemplate, INotificationTemplateInfo } from './template'
import type { IMemberAccount } from '@/member'

/**
 * 消息通知日志
 */
export interface INotificationLog {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 消息通知范围
   *
   * @see {@link NotificationScope}
   */
  scope: NotificationScope
  /**
   * 消息发送状态
   *
   * @see {@link NotificationSendStatus}
   */
  status: NotificationSendStatus
  /**
   * 消息场景
   *
   * @see {@link NotificationScene}
   */
  scene: NotificationScene
  /**
   * 消息发送通道
   *
   * @see {@link NotificationChannel}
   */
  channel: NotificationChannel
  /**
   * 接收会员 ID
   */
  memberId: IMemberAccount['id']
  /**
   * 消息模板 ID
   */
  templateId: INotificationTemplate['id']
  /**
   * 消息模板信息
   *
   * @see {@link INotificationTemplateInfo}
   */
  template: INotificationTemplateInfo
  /**
   * 消息发送目标 (用户名, 邮箱地址, 手机号...)
   */
  sendTo: string
  /**
   * 消息标题
   */
  title: string
  /**
   * 消息内容
   */
  content: string
  /**
   * 发送结果
   */
  result: string
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 消息通知日志列表
 *
 * @see {@link INotificationLog}
 */
export type INotificationLogListItem = Pick<
  INotificationLog,
  | 'id'
  | 'scope'
  | 'status'
  | 'scene'
  | 'channel'
  | 'memberId'
  | 'template'
  | 'sendTo'
  | 'title'
  | 'createdTime'
>
