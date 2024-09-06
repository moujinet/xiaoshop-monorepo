import type { NotificationChannel } from './constants'
import type { INotificationTemplateInfo } from './template'

/**
 * 消息通知模板内容
 */
export interface INotificationTemplateContent {
  /**
   * 消息模板内容 ID
   */
  id: number
  /**
   * 消息模板 ID
   */
  templateId: number
  /**
   * 消息模板信息
   *
   * @see {@link INotificationTemplateInfo}
   */
  template: INotificationTemplateInfo
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
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 消息通知模板内容信息
 *
 * @see {@link INotificationTemplateContent}
 */
export type INotificationTemplateContentInfo = Pick<
  INotificationTemplateContent,
  | 'id'
  | 'channel'
  | 'title'
  | 'content'
>
