import type { NotificationChannel, NotificationScene, NotificationType } from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import { PickType } from '@nestjs/mapped-types'
import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

/**
 * Notification Message Content
 */
export class NotificationMessageContentPayload {
  @IsNumber({}, { message: '消息通道不正确' })
  readonly channel: NotificationChannel

  @IsString({ message: '消息标题不正确' })
  @IsNotEmpty({ message: '消息标题不能为空' })
  readonly title: string

  @IsString({ message: '消息内容不正确' })
  @IsNotEmpty({ message: '消息内容不能为空' })
  readonly content: string
}

/**
 * Create Notification Message
 */
export class CreateNotificationMessagePayload {
  @IsString({ message: '触发事件不正确' })
  @IsNotEmpty({ message: '触发事件不能为空' })
  readonly listenTo: string

  @IsNumber({}, { message: '通知类型不正确' })
  @IsNotEmpty({ message: '通知类型不能为空' })
  readonly type: NotificationType

  @IsNumber({}, { message: '通知场景不正确' })
  @IsNotEmpty({ message: '通知场景不能为空' })
  readonly scene: NotificationScene

  @IsString({ message: '模板名称不正确' })
  @IsNotEmpty({ message: '模板名称不能为空' })
  readonly name: string

  @IsString({ message: '模板描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsNumber({}, { each: true, message: '消息通道不正确' })
  @ArrayNotEmpty({ message: '消息通道不能为空' })
  readonly channels: NotificationChannel[]

  @ValidateNested()
  @Type(() => NotificationMessageContentPayload)
  @ArrayNotEmpty({ message: '消息模板内容不能为空' })
  readonly contents: NotificationMessageContentPayload[]
}

/**
 * Update Notification Message
 */
export class UpdateNotificationMessagePayload extends PickType(
  CreateNotificationMessagePayload,
  ['name', 'desc', 'channels', 'contents'] as const,
) {}
