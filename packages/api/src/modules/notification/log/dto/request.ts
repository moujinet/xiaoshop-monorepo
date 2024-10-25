import type { NotificationChannel, NotificationScene, NotificationSendStatus, NotificationType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Notification Log Pages
 */
export class GetNotificationLogPagesRequest extends PaginationDto {
  @IsNumberString({}, { message: '消息类型不正确' })
  @IsOptional()
  readonly type?: NotificationType

  @IsNumberString({}, { message: '消息场景不正确' })
  @IsOptional()
  readonly scene?: NotificationScene

  @IsNumberString({}, { message: '发送通道不正确' })
  @IsOptional()
  readonly channel?: NotificationChannel

  @IsString({ message: '订阅者不正确' })
  @IsOptional()
  readonly subscriber?: string

  @IsNumberString({}, { message: '发送状态不正确' })
  @IsOptional()
  readonly status?: NotificationSendStatus

  @IsString({ message: '发送时间不正确' })
  @IsOptional()
  readonly sentTime?: string
}

/**
 * Get Notification Log
 */
export class GetNotificationLogRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}
