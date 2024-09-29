import type { IDict } from '~/common'

import type { ISystemNotificationTemplateDict } from './template'
import type { ISystemNotificationExtrasInfo } from './notification'

/**
 * 通知发送日志信息
 */
export interface ISystemNotificationLogInfo {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 通知类型
   *
   * @see {@link SystemNotificationType}
   */
  type: IDict
  /**
   * 通知场景
   *
   * @see {@link SystemNotificationScene}
   */
  scene: IDict
  /**
   * 发送通道
   *
   * @see {@link SystemNotificationChannel}
   */
  channel: IDict
  /**
   * 通知模板
   */
  template: ISystemNotificationTemplateDict
  /**
   * 通知标题
   */
  title: string
  /**
   * 通知内容
   */
  content: string
  /**
   * 附加数据 (JSON)
   */
  extras?: ISystemNotificationExtrasInfo
  /**
   * 接收人
   *
   * - `SystemNotificationChannel.SYSTEM` - (买家: nickname, 商家: name)
   * - `SystemNotificationChannel.SMS` - (买家: mobile, 商家: 指定 mobile)
   * - `SystemNotificationChannel.WECHAT` - (买家: openid, 商家: 指定 openid)
   */
  sendTo: string
  /**
   * 发送状态
   *
   * @see {@link SystemNotificationSendStatus}
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
 * 通知发送日志列表
 */
export type ISystemNotificationLogList = Pick<
  ISystemNotificationLogInfo,
  | 'id'
  | 'type'
  | 'scene'
  | 'channel'
  | 'template'
  | 'sendTo'
  | 'status'
  | 'sentTime'
>
