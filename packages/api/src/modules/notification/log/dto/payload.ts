import type { NotificationChannel, NotificationScene, NotificationSendStatus, NotificationType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

/**
 * Create Notification Log
 */
export class CreateNotificationLogPayload {
  @IsNumber({}, { message: '通知类型不正确' })
  @IsNotEmpty({ message: '通知类型不能为空' })
  readonly type: NotificationType

  @IsNumber({}, { message: '通知场景不正确' })
  @IsNotEmpty({ message: '通知场景不能为空' })
  readonly scene: NotificationScene

  @IsNumber({}, { message: '发送通道不正确' })
  @IsNotEmpty({ message: '发送通道不能为空' })
  readonly channel: NotificationChannel

  @IsString({ message: '订阅者不正确' })
  @IsNotEmpty({ message: '订阅者不能为空' })
  readonly subscriber: string

  @IsString({ message: '通知标题不正确' })
  @IsNotEmpty({ message: '通知标题不能为空' })
  readonly title: string

  @IsString({ message: '通知内容不正确' })
  @IsNotEmpty({ message: '通知内容不能为空' })
  readonly content: string

  @IsNumber({}, { message: '发送状态不正确' })
  @IsNotEmpty({ message: '发送状态不能为空' })
  readonly status: NotificationSendStatus

  @IsString({ message: '发送结果不正确' })
  @IsNotEmpty({ message: '发送结果不能为空' })
  readonly result: string
}
