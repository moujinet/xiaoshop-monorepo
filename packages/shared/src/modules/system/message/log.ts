import type { IDict } from '~/common'

import type { ISystemMessageExtrasInfo } from './message'
import type { ISystemMessageTemplateDict } from './template'

/**
 * 消息发送日志信息
 */
export interface ISystemMessageLogInfo {
  /**
   * 日志 ID
   */
  id: number
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
   * 发送通道
   *
   * @see {@link SystemMessageChannel}
   */
  channel: IDict
  /**
   * 消息模板
   */
  template: ISystemMessageTemplateDict
  /**
   * 消息标题
   */
  title: string
  /**
   * 消息内容
   */
  content: string
  /**
   * 附加数据 (JSON)
   */
  extras?: ISystemMessageExtrasInfo
  /**
   * 接收人
   *
   * - `MessageChannel.SYSTEM` - (买家: nickname, 商家: name)
   * - `MessageChannel.SMS` - (买家: mobile, 商家: 指定 mobile)
   * - `MessageChannel.WECHAT` - (买家: openid, 商家: 指定 openid)
   */
  receiver: string
  /**
   * 发送状态
   *
   * @see {@link MessageSendStatus}
   */
  status: IDict
  /**
   * 发送结果
   */
  result: string
  /**
   * 发送时间
   */
  sentTime: string
}

/**
 * 消息发送日志列表
 */
export type ISystemMessageLogList = Pick<
  ISystemMessageLogInfo,
  | 'id'
  | 'type'
  | 'scene'
  | 'channel'
  | 'template'
  | 'receiver'
  | 'status'
  | 'sentTime'
>
