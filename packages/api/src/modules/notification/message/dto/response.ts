import { ApiProperty, PickType } from '@nestjs/swagger'
import type {
  INotificationMessage,
  INotificationMessageListItem,
  NotificationScene,
  NotificationScope,
  NotificationStatus,
} from '@xiaoshop/shared'
import { example } from './example'

export class NotificationMessageResponse implements INotificationMessage {
  @ApiProperty({ description: '消息通知 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '接收会员 ID', example: 1 })
  readonly memberId: number

  @ApiProperty({ description: '消息通知范围', example: example.scope })
  readonly scope: NotificationScope

  @ApiProperty({ description: '消息通知状态', example: example.status })
  readonly status: NotificationStatus

  @ApiProperty({ description: '消息类别', example: example.scene })
  readonly scene: NotificationScene

  @ApiProperty({ description: '消息通知标题', example: example.title })
  readonly title: string

  @ApiProperty({ description: '消息通知内容', example: example.content })
  readonly content: string

  @ApiProperty({ description: '附加数据', example: example.extras })
  readonly extras: Record<string, any>

  @ApiProperty({ description: '发送时间', example: '2020-01-01 00:00:00' })
  readonly sentTime: string
}

export class NotificationMessageListResponse
  extends PickType(NotificationMessageResponse, [
    'id',
    'status',
    'scene',
    'title',
    'content',
    'extras',
    'sentTime',
  ])
  implements INotificationMessageListItem {}
