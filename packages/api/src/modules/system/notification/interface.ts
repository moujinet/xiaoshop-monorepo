import type {
  ISystemNotificationExtrasInfo,
  ISystemNotificationTemplateInfo,
  SystemNotificationScene,
  SystemNotificationType,
} from '@xiaoshop/shared'

/**
 * 系统消息发送任务
 */
export interface ISystemNotificationSendJob {
  /**
   * 消息模板 ID
   */
  templateId: ISystemNotificationTemplateInfo['id']
  /**
   * 消息类型
   *
   * @see {@link SystemNotificationType}
   */
  type: SystemNotificationType
  /**
   * 消息场景
   *
   * @see {@link SystemNotificationScene}
   */
  scene: SystemNotificationScene
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
  extras?: ISystemNotificationExtrasInfo
  /**
   * 消息接收者 ID 列表
   */
  subscribers?: ISystemNotificationTemplateInfo['subscribers']
}
