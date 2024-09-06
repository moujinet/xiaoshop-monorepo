import type {
  IMemberAccount,
  INotificationTemplate,
  NotificationScene,
  NotificationScope,
} from '@xiaoshop/shared'

/**
 * 通知消息上下文
 */
export interface INotificationMessageJob {
  /**
   * 通知模板 ID
   */
  templateId: INotificationTemplate['id']
  /**
   * 会员 ID
   */
  memberId: IMemberAccount['id']
  /**
   * 通知范围
   *
   * @see {@link NotificationScope}
   */
  scope: NotificationScope
  /**
   * 通知场景
   *
   * @see {@link NotificationScene}
   */
  scene: NotificationScene
  /**
   * 通知标题
   */
  rawTitle: string
  /**
   * 通知内容
   */
  rawContent: string
  /**
   * 附加信息
   */
  extras: Record<string, any>
}
