import type { IDict } from '~/common'

import type { IMessageTemplateDict } from './template'

/**
 * 消息发送日志信息
 */
export interface IMessageLogInfo {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 消息类型
   *
   * @see {@link MessageType}
   */
  type: IDict
  /**
   * 发送通道
   *
   * @see {@link MessageChannel}
   */
  channel: IDict
  /**
   * 发送状态
   *
   * @see {@link MessageSendStatus}
   */
  status: IDict
  /**
   * 消息模板
   */
  template: IMessageTemplateDict
  /**
   * 发送对象
   *
   * - `MessageChannel.SYSTEM` - (买家: nickname, 商家: '商家')
   * - `MessageChannel.SMS` - (买家: mobile, 商家: 指定 mobile)
   * - `MessageChannel.WECHAT` - (买家: openid, 商家: 指定 openid)
   */
  sendTo: string
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
  extras: Record<string, any>
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
export type IMessageLogList = Pick<
  IMessageLogInfo,
  | 'id'
  | 'type'
  | 'channel'
  | 'status'
  | 'template'
  | 'sendTo'
  | 'sentTime'
>
