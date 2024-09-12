import type { NotificationChannel } from './constants'

/**
 * 消息通知模板内容
 */
export interface INotificationTemplateContentInfo {
  /**
   * 消息模板内容 ID
   */
  id: number
  /**
   * 消息发送通道
   *
   * @see {@link NotificationChannel}
   */
  channel: NotificationChannel
  /**
   * 消息标题
   */
  title: string
  /**
   * 消息内容
   */
  content: string
}
