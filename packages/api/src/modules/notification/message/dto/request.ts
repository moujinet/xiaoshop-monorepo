import type { NotificationScene, NotificationType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator'

/**
 * Query Notification Message List
 */
export class GetNotificationMessageListRequest {
  @IsNumberString({}, { message: '通知类型不正确' })
  @IsOptional()
  readonly type?: NotificationType

  @IsNumberString({}, { message: '通知场景不正确' })
  @IsOptional()
  readonly scene?: NotificationScene
}

/**
 * Get Notification Message
 */
export class GetNotificationMessageRequest {
  @IsNumberString({}, { message: '通知消息模板 ID 不正确' })
  @IsNotEmpty({ message: '通知消息模板 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Notification Message
 */
export class DeleteNotificationMessageRequest {
  @IsNumber({}, { message: '通知消息模板 ID 不正确' })
  readonly id: number
}
