import type { IDict } from '~/common'

import type { MessageChannel } from './constants'

/**
 * 消息模板信息
 */
export interface IMessageTemplateInfo {
  /**
   * 模板 ID
   */
  id: number
  /**
   * 模板标识 (同事件名称)
   */
  key: string
  /**
   * 是否启用
   *
   * @see {@link YesOrNo}
   */
  isEnabled: IDict
  /**
   * 消息类型
   *
   * @see {@link MessageType}
   */
  type: IDict
  /**
   * 消息场景
   *
   * @see {@link MessageScene}
   */
  scene: IDict
  /**
   * 模板名称
   */
  name: string
  /**
   * 模板描述
   */
  desc: string
  /**
   * 消息发送通道
   *
   * @see {@link MessageChannel}
   */
  channels: IDict[]
  /**
   * 消息模板内容
   */
  contents: IMessageTemplateContent[]
}

/**
 * 消息模板内容
 */
export interface IMessageTemplateContent {
  /**
   * 消息通道
   */
  channel: MessageChannel
  /**
   * 消息标题
   */
  title: string
  /**
   * 消息内容
   */
  content: string
}

/**
 * 消息模板字典
 */
export type IMessageTemplateDict = Pick<
  IMessageTemplateInfo,
  | 'id'
  | 'name'
>

/**
 * 消息模板列表
 */
export type IMessageTemplateList = Pick<
  IMessageTemplateInfo,
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
 * 消息模板内容列表
 */
export type IMessageTemplateContentList = Pick<
  IMessageTemplateInfo,
  | 'id'
  | 'name'
  | 'channels'
  | 'contents'
>
