import { IsNotEmpty, IsNumberString } from 'class-validator'

/**
 * Query Notification Subscriber List
 */
export class GetNotificationSubscriberListRequest {
  @IsNumberString({}, { message: '通知消息 ID 不正确' })
  @IsNotEmpty({ message: '通知消息 ID 不能为空' })
  readonly messageId: number
}
