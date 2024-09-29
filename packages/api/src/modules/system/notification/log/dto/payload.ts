import type {
  ISystemNotificationExtrasInfo,
  SystemNotificationChannel,
  SystemNotificationScene,
  SystemNotificationSendStatus,
  SystemNotificationType,
} from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, NotEquals } from 'class-validator'

export class SystemNotificationLogPayload {
  @IsNumber({}, { message: '消息模板 ID 不正确' })
  @NotEquals(0, { message: '消息模板 ID 不正确' })
  readonly templateId: number

  @IsNumber({}, { message: '消息类型不正确' })
  @NotEquals(0, { message: '消息类型不正确' })
  readonly type: SystemNotificationType

  @IsNumber({}, { message: '消息场景不正确' })
  @NotEquals(0, { message: '消息场景不正确' })
  readonly scene: SystemNotificationScene

  @IsNumber({}, { message: '发送通道不正确' })
  @NotEquals(0, { message: '发送通道不正确' })
  readonly channel: SystemNotificationChannel

  @IsString({ message: '接收人不正确' })
  @IsNotEmpty({ message: '接收人不能为空' })
  readonly title: string

  @IsString({ message: '消息内容不正确' })
  @IsNotEmpty({ message: '消息内容不能为空' })
  readonly content: string

  @IsObject({ message: '附加数据不正确' })
  @IsOptional()
  readonly extras?: ISystemNotificationExtrasInfo

  @IsString({ message: '接收人不正确' })
  @IsNotEmpty({ message: '接收人不能为空' })
  readonly sendTo: string

  @IsNumber({}, { message: '发送状态不正确' })
  @NotEquals(0, { message: '发送状态不正确' })
  readonly status: SystemNotificationSendStatus

  @IsString({ message: '发送结果不正确' })
  @IsOptional()
  readonly result?: string
}
