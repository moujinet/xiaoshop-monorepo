import type { YesOrNo } from '~/common'
import type { NotificationChannel, NotificationScene, NotificationScope } from './constants'
import type { INotificationTemplateContentInfo } from './template-content'

/**
 * 消息通知模板
 */
export interface INotificationTemplateInfo {
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
  isEnabled: YesOrNo
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
}

/**
 * 消息通知模板字典
 *
 * @see {@link INotificationTemplateInfo}
 */
export type INotificationTemplateDict = Pick<
  INotificationTemplateInfo,
  | 'id'
  | 'name'
>

/**
 * 消息通知模板列表
 *
 * @see {@link INotificationTemplateInfo}
 */
export type INotificationTemplateList = Pick<
  INotificationTemplateInfo,
  | 'id'
  | 'key'
  | 'isEnabled'
  | 'scope'
  | 'scene'
  | 'channels'
  | 'name'
  | 'desc'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}
