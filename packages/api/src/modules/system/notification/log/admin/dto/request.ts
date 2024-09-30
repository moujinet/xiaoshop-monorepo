import type {
  SystemNotificationChannel,
  SystemNotificationScene,
  SystemNotificationSendStatus,
  SystemNotificationType,
} from '@xiaoshop/shared'

import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetSystemNotificationLogPagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '消息类型不正确' })
  @IsOptional()
  readonly type?: SystemNotificationType

  @IsNumberString({}, { message: '消息场景不正确' })
  @IsOptional()
  readonly scene?: SystemNotificationScene

  @IsNumberString({}, { message: '发送通道不正确' })
  @IsOptional()
  readonly channel?: SystemNotificationChannel

  @IsNumberString({}, { message: '消息模板 ID 不正确' })
  @IsOptional()
  readonly templateId?: number

  @IsString({ message: '接收人不正确' })
  @IsOptional()
  readonly sendTo?: string

  @IsNumberString({}, { message: '发送状态不正确' })
  @IsOptional()
  readonly status?: SystemNotificationSendStatus

  @IsString({ message: '发送时间不正确' })
  @IsOptional()
  readonly sentTime?: string
}

export class GetSystemNotificationLogInfoRequest {
  @IsNumberString({}, { message: '消息 ID 不正确' })
  @IsNotEmpty({ message: '消息 ID 不能为空' })
  readonly id: number
}
