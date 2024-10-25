import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

/**
 * Upsert Notification Subscriber
 */
export class UpsertNotificationSubscriberPayload {
  @IsNumber({}, { message: '通知消息 ID 不正确' })
  @IsNotEmpty({ message: '通知消息 ID 不能为空' })
  readonly messageId: number

  @IsNumber({}, { each: true, message: '通知消息 ID 不正确' })
  @IsOptional()
  readonly subscriberIds?: number[]
}
