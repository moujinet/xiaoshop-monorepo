import type {
  ISystemMessageExtrasInfo,
  ISystemMessageTemplateInfo,
  SystemMessageScene,
  SystemMessageType,
} from '@xiaoshop/shared'

/**
 * 系统消息发送任务
 */
export interface ISystemMessageSendJob {
  /**
   * 消息模板 ID
   */
  templateId: ISystemMessageTemplateInfo['id']
  /**
   * 消息类型
   *
   * @see {@link SystemMessageType}
   */
  type: SystemMessageType
  /**
   * 消息场景
   *
   * @see {@link SystemMessageScene}
   */
  scene: SystemMessageScene
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
  extras?: ISystemMessageExtrasInfo
}
