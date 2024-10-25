import type { INotificationExtrasInfo, NotificationScene, NotificationType } from '@xiaoshop/shared'
import type { INotificationMessageSendJob } from '@/notification/message/domain/subscribe/interface'

import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, NotEquals } from 'class-validator'

/**
 * Create Notification Inbox Store
 */
export class CreateNotificationInboxPayload implements INotificationMessageSendJob {
  @IsNumber({}, { message: '订阅者 ID 不正确' })
  @NotEquals(0, { message: '订阅者 ID 不能为 0' })
  readonly subscriberId: number

  @IsNumber({}, { message: '通知类型不正确' })
  @IsNotEmpty({ message: '通知类型不能为空' })
  readonly type: NotificationType

  @IsNumber({}, { message: '通知场景不正确' })
  @IsNotEmpty({ message: '通知场景不能为空' })
  readonly scene: NotificationScene

  @IsString({ message: '通知标题不正确' })
  @IsNotEmpty({ message: '通知标题不能为空' })
  readonly title: string

  @IsString({ message: '通知内容不正确' })
  @IsNotEmpty({ message: '通知内容不能为空' })
  readonly content: string

  @IsObject({ message: '附加数据不正确' })
  @IsOptional()
  readonly extras?: INotificationExtrasInfo
}
