import type { IDict } from '~/common'

/**
 * 消息通知信息
 */
export interface IMessageNoticeInfo {
  /**
   * 消息通知 ID
   */
  id: number
  /**
   * 消息场景
   *
   * @see {@link MessageScene}
   */
  scene: IDict
  /**
   * 通知状态
   *
   * @see {@link MessageStatus}
   */
  status: IDict
  /**
   * 通知标题
   */
  title: string
  /**
   * 通知内容
   */
  content: string
  /**
   * 附加数据
   */
  extras: Record<string, any>
  /**
   * 发送时间
   */
  sentTime: string
}

/**
 * 消息通知列表
 */
export type IMessageNoticeList = Pick<
  IMessageNoticeInfo,
  | 'id'
  | 'scene'
  | 'status'
  | 'title'
  | 'content'
  | 'extras'
  | 'sentTime'
>
