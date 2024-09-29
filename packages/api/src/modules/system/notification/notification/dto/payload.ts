import type {
  ISystemNotificationExtrasInfo,
  SystemNotificationScene,
  SystemNotificationType,
} from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, NotEquals } from 'class-validator'

export class SystemNotificationPayload {
  @IsNumber({}, { message: '用户 ID 不正确' })
  @NotEquals(0, { message: '用户 ID 不能为 0' })
  readonly receiverId: number

  @IsNumber({}, { message: '通知类型不正确' })
  @IsOptional()
  readonly type?: SystemNotificationType

  @IsNumber({}, { message: '通知场景不正确' })
  @IsOptional()
  readonly scene?: SystemNotificationScene

  @IsString({ message: '通知标题不正确' })
  @IsNotEmpty({ message: '通知标题不能为空' })
  readonly title: string

  @IsString({ message: '通知内容不正确' })
  @IsNotEmpty({ message: '通知内容不能为空' })
  readonly content: string

  @IsObject({ message: '附加数据不正确' })
  @IsOptional()
  readonly extras?: ISystemNotificationExtrasInfo
}
