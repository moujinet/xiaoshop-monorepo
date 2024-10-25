import type { INotificationExtrasInfo, NotificationScene, NotificationType } from '@xiaoshop/shared'

export interface INotificationMessageSendJob {
  /**
   * 订阅者 ID
   */
  subscriberId: number
  /**
   * 消息类型
   */
  type: NotificationType
  /**
   * 消息场景
   */
  scene: NotificationScene
  /**
   * 消息标题
   */
  title: string
  /**
   * 消息内容
   */
  content: string
  /**
   * 附加数据
   */
  extras?: INotificationExtrasInfo
}
