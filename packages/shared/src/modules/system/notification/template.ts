import type { IDict, YesOrNo } from '~/common'
import type { ISystemUserDict } from '@/system/auth'

import type { SystemNotificationChannel, SystemNotificationScene, SystemNotificationType } from './constants'

/**
 * 通知模板信息
 */
export interface ISystemNotificationTemplateInfo {
  /**
   * 模板 ID
   */
  id: number
  /**
   * 是否启用
   */
  isEnabled: YesOrNo
  /**
   * 触发事件
   */
  trigger: string
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
   * 模板名称
   */
  name: string
  /**
   * 模板描述
   */
  desc: string
  /**
   * 通知发送通道 (ARRAY)
   *
   * @see {@link SystemNotificationChannel}
   */
  channels: IDict[]
  /**
   * 通知模板内容 (JSON)
   */
  contents: ISystemNotificationTemplateContent[]
  /**
   * 订阅系统用户
   */
  subscribers: ISystemUserDict[]
}

/**
 * 通知模板内容
 */
export interface ISystemNotificationTemplateContent {
  /**
   * 通知发送通道
   */
  channel: SystemNotificationChannel
  /**
   * 通知标题
   */
  title: string
  /**
   * 通知内容
   */
  content: string
}

/**
 * 通知模板字典
 */
export type ISystemNotificationTemplateDict = Pick<
  ISystemNotificationTemplateInfo,
  | 'id'
  | 'name'
>

/**
 * 通知模板列表
 */
export type ISystemNotificationTemplateList = Pick<
  ISystemNotificationTemplateInfo,
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
 * 通知模板触发事件
 */
export type ISystemNotificationTemplateTriggerList = Pick<
  ISystemNotificationTemplateInfo,
  | 'id'
  | 'trigger'
>

/**
 * 可发送通知模板内容列表
 */
export type ISystemNotificationTemplateContentList = Pick<
  ISystemNotificationTemplateInfo,
  | 'id'
  | 'subscribers'
>
& {
  /**
   * 通知类型
   */
  type: SystemNotificationType
  /**
   * 通知场景
   */
  scene: SystemNotificationScene
}
& ISystemNotificationTemplateContent
