import { NotificationType } from '@xiaoshop/shared'
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Notification Inbox Pages
 */
export class GetNotificationInboxPagesRequest extends PaginationDto {}

/**
 * Get Notification With Owner
 */
export class GetNotificationWithOwnerRequest {
  @IsNumber({}, { message: '接收人 ID 不正确' })
  readonly receiverId: number

  @IsNumber({}, { message: '接收人 ID 不正确' })
  @IsNotEmpty({ message: '接收人 ID 不能为空' })
  readonly type: NotificationType
}

/**
 * Get Notification
 */
export class GetNotificationRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Get Notification On Post
 */
export class GetNotificationOnPost {
  @IsNumber({}, { each: true, message: 'ID 不正确' })
  readonly ids: number[]
}
