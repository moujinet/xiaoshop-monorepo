import {
  NotificationChannel,
  NotificationScene,
  NotificationScope,
  NotificationSendStatus,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'
import { example } from './example'
import { PaginationRequest } from '~/common/dto'

export class GetNotificationLogPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '通知范围', enum: NotificationScope, example: example.scope })
  @IsNumberString({}, { message: '通知范围不正确' })
  @IsOptional()
  readonly scope: NotificationScope

  @ApiProperty({ required: false, description: '通知状态', enum: NotificationSendStatus, example: example.status })
  @IsNumberString({}, { message: '通知状态不正确' })
  @IsOptional()
  readonly status: NotificationSendStatus

  @ApiProperty({ required: false, description: '消息场景', enum: NotificationScene, example: example.scene })
  @IsNumberString({}, { message: '消息场景不正确' })
  @IsOptional()
  readonly scene: NotificationScene

  @ApiProperty({ required: false, description: '消息通道', enum: NotificationChannel, example: example.channel })
  @IsNumberString({}, { message: '消息通道不正确' })
  @IsOptional()
  readonly channel: NotificationChannel

  @ApiProperty({ required: false, description: '消息模板', example: 1 })
  @IsNumberString({}, { message: '消息模板不正确' })
  @IsOptional()
  readonly templateId: number
}

export class GetNotificationLogRequest {
  @ApiProperty({ description: '消息日志 ID', example: 1 })
  @IsNumberString({}, { message: '消息日志 ID 不正确' })
  readonly id: number
}
