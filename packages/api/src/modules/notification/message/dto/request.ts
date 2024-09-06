import {
  NotificationScene,
  NotificationScope,
  NotificationStatus,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator'
import { example } from './example'
import { PaginationRequest } from '~/common/dto'

export class GetNotificationMessagePagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '接收会员 ID', example: 1 })
  @IsNumberString({}, { message: '接收会员不正确' })
  @IsOptional()
  readonly memberId: number

  @ApiProperty({ required: false, description: '消息通知范围', enum: NotificationScope, example: example.scope })
  @IsNumberString({}, { message: '消息通知范围不正确' })
  @IsOptional()
  readonly scope: NotificationScope

  @ApiProperty({ required: false, description: '消息通知状态', enum: NotificationStatus, example: example.status })
  @IsNumberString({}, { message: '消息通知状态不正确' })
  @IsOptional()
  readonly status: NotificationStatus

  @ApiProperty({ required: false, description: '消息场景', enum: NotificationScene, example: example.scene })
  @IsNumberString({}, { message: '消息场景不正确' })
  @IsOptional()
  readonly scene: NotificationScene
}

export class GetNotificationMessageListRequest {
  @ApiProperty({ required: false, description: '消息数量', example: 1 })
  @IsNumberString({}, { message: '消息数量不正确' })
  @IsOptional()
  readonly limit: number

  @ApiProperty({ required: false, description: '消息通知范围', enum: NotificationScope, example: example.scope })
  @IsNumberString({}, { message: '消息通知范围不正确' })
  @IsOptional()
  readonly scope: NotificationScope

  @ApiProperty({ required: false, description: '消息通知状态', enum: NotificationStatus, example: example.status })
  @IsNumberString({}, { message: '消息通知状态不正确' })
  @IsOptional()
  readonly status: NotificationStatus

  @ApiProperty({ required: false, description: '消息场景', enum: NotificationScene, example: example.scene })
  @IsNumberString({}, { message: '消息场景不正确' })
  @IsOptional()
  readonly scene: NotificationScene
}

export class GetNotificationMessageRequest {
  @ApiProperty({ description: '消息通知 ID', example: 1 })
  @IsNumberString({}, { message: '消息通知 ID 不正确' })
  @IsNotEmpty({ message: '消息通知 ID 不正确' })
  readonly id: number
}

export class DeleteNotificationMessageRequest {
  @ApiProperty({ description: '消息通知 ID', example: 1 })
  @IsNumber({}, { message: '消息通知 ID 不正确' })
  @IsNotEmpty({ message: '消息通知 ID 不正确' })
  readonly id: number

  @ApiProperty({ required: false, description: '接收会员 ID', example: 1 })
  @IsNumber({}, { message: '接收会员不正确' })
  @IsOptional()
  readonly memberId: number
}
