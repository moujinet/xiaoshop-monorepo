import type {
  NotificationChannel,
  NotificationScene,
  NotificationScope,
} from './constants'
import type { INotificationTemplateContentInfo } from './template-content'
import type { YesOrNo } from '~/common'

/**
 * 消息通知模板
 */
export interface INotificationTemplate {
  /**
   * 消息模板 ID
   */
  id: number
  /**
   * 消息模板标识
   */
  key: string
  /**
   * 启用状态
   *
   * @see {@link YesOrNo}
   */
  enable: YesOrNo
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
   * 消息发送通道
   *
   * @see {@link NotificationChannel}
   */
  channels: NotificationChannel[]
  /**
   * 消息通知模板名称
   */
  name: string
  /**
   * 消息通知模板描述
   */
  desc: string
  /**
   * 消息通知模板内容
   *
   * @see {@link INotificationTemplateContentInfo}
   */
  contents: INotificationTemplateContentInfo[]
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 消息通知模板信息
 *
 * @see {@link INotificationTemplate}
 */
export type INotificationTemplateInfo = Pick<
  INotificationTemplate,
  | 'id'
  | 'key'
  | 'enable'
  | 'scene'
  | 'name'
  | 'desc'
>

/**
 * 消息通知模板列表
 *
 * @see {@link INotificationTemplate}
 */
export type INotificationTemplateListItem = Pick<
  INotificationTemplate,
  | 'id'
  | 'key'
  | 'enable'
  | 'scope'
  | 'scene'
  | 'channels'
  | 'name'
  | 'desc'
  | 'updatedTime'
>
