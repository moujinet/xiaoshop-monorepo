import type { IDict, YesOrNo } from '~/common'
import type {
  NotificationChannel,
  NotificationScene,
  NotificationType,
} from './constants'

/**
 * 通知消息信息
 */
export interface INotificationMessageInfo {
  /**
   * 通知 ID
   */
  id: number
  /**
   * 是否启用
   */
  isEnabled: YesOrNo
  /**
   * 触发事件
   */
  trigger: string
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
   * 通知名称
   */
  name: string
  /**
   * 通知描述
   */
  desc: string
  /**
   * 通知发送通道 (ARRAY)
   *
   * @see {@link NotificationChannel}
   */
  channels: IDict[]
  /**
   * 通知模板内容 (JSON)
   */
  contents: INotificationMessageContent[]
}

/**
 * 通知消息内容
 */
export interface INotificationMessageContent {
  /**
   * 通知发送通道
   */
  channel: NotificationChannel
  /**
   * 通知标题
   */
  title: string
  /**
   * 通知内容
   */
  content: string
}

/**
 * 通知消息字典
 */
export type INotificationMessageDict = Pick<
  INotificationMessageInfo,
  | 'id'
  | 'name'
>

/**
 * 通知消息列表
 */
export type INotificationMessageList = Pick<
  INotificationMessageInfo,
  | 'id'
  | 'isEnabled'
  | 'name'
  | 'desc'
  | 'channels'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 通知消息触发事件列表
 */
export type INotificationMessageTriggerList = Pick<
  INotificationMessageInfo,
  | 'id'
  | 'trigger'
>

/**
 * 通知消息内容列表
 */
export type INotificationMessageContentList = Pick<
  INotificationMessageInfo,
  | 'id'
>
& {
  /**
   * 通知类型
   */
  type: NotificationType
  /**
   * 通知场景
   */
  scene: NotificationScene
}
& INotificationMessageContent
