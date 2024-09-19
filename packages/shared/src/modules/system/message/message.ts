import type { IDict } from '~/common'

/**
 * 系统消息信息
 */
export interface ISystemMessageInfo {
  /**
   * 系统消息 ID
   */
  id: number
  /**
   * 消息场景
   *
   * @see {@link SystemMessageScene}
   */
  scene: IDict
  /**
   * 消息状态
   *
   * @see {@link SystemMessageStatus}
   */
  status: IDict
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
  /**
   * 发送时间
   */
  sentTime: string
}

/**
 * 附加数据
 */
export interface ISystemMessageExtrasInfo {
  [key: string]: any
}

/**
 * 系统消息列表
 */
export type ISystemMessageList = Pick<
  ISystemMessageInfo,
  | 'id'
  | 'scene'
  | 'status'
  | 'title'
  | 'content'
  | 'extras'
  | 'sentTime'
>
