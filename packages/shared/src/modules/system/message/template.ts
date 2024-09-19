import type { IDict, YesOrNo } from '~/common'

import type { SystemMessageChannel } from './constants'

/**
 * 消息模板信息
 */
export interface ISystemMessageTemplateInfo {
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
  isEnabled: YesOrNo
  /**
   * 消息类型
   *
   * @see {@link SystemMessageType}
   */
  type: IDict
  /**
   * 消息场景
   *
   * @see {@link SystemMessageScene}
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
   * @see {@link SystemMessageChannel}
   */
  channels: IDict[]
  /**
   * 消息模板内容
   */
  contents: ISystemMessageTemplateContent[]
}

/**
 * 消息模板内容
 */
export interface ISystemMessageTemplateContent {
  /**
   * 消息通道
   */
  channel: SystemMessageChannel
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
export type ISystemMessageTemplateDict = Pick<
  ISystemMessageTemplateInfo,
  | 'id'
  | 'name'
>

/**
 * 消息模板列表
 */
export type ISystemMessageTemplateList = Pick<
  ISystemMessageTemplateInfo,
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
 * 可发送消息模板内容列表
 */
export type ISystemMessageTemplateContentList = Pick<
  ISystemMessageTemplateInfo,
  | 'id'
  | 'type'
  | 'scene'
>
& Pick<ISystemMessageTemplateContent, 'title' | 'content'>
& {
  /**
   * 消息通道
   *
   * @see {@link SystemMessageChannel}
   */
  channel: IDict
}
