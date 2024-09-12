import type { IMemberAccountInfo } from '@/member'
import type { NotificationChannel, NotificationScene, NotificationScope, NotificationSendStatus } from './constants'
import type { INotificationTemplateDict } from './template'

/**
 * 消息通知日志
 */
export interface INotificationLogInfo {
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
  memberId: IMemberAccountInfo['id']
  /**
   * 消息模板信息
   *
   * @see {@link INotificationTemplateDict}
   */
  template: INotificationTemplateDict
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
}

/**
 * 消息通知日志列表
 *
 * @see {@link INotificationLogInfo}
 */
export type INotificationLogList = Pick<
  INotificationLogInfo,
  | 'id'
  | 'scope'
  | 'status'
  | 'scene'
  | 'channel'
  | 'memberId'
  | 'template'
  | 'sendTo'
  | 'title'
> & {
  /**
   * 创建时间
   */
  createdTime: string
}
