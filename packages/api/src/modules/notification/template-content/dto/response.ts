import type {
  INotificationTemplate,
  INotificationTemplateContent,
  INotificationTemplateContentInfo,
  INotificationTemplateInfo,
  NotificationChannel,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class NotificationTemplateContentResponse implements INotificationTemplateContent {
  @ApiProperty({ description: '消息通知模板内容 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '消息通知模板 ID', example: 1 })
  readonly templateId: INotificationTemplate['id']

  @ApiProperty({ description: '消息通知模板信息', example: example.template })
  readonly template: INotificationTemplateInfo

  @ApiProperty({ description: '消息通知通道', example: example.channel })
  readonly channel: NotificationChannel

  @ApiProperty({ description: '消息通知标题', example: example.title })
  readonly title: string

  @ApiProperty({ description: '消息通知内容', example: example.content })
  readonly content: string

  @ApiProperty({ description: '更新时间', example: '2022-01-01 00:00:00' })
  readonly updatedTime: string
}

export class NotificationTemplateContentInfoResponse
  extends PickType(NotificationTemplateContentResponse, [
    'id',
    'channel',
    'title',
    'content',
  ] as const)
  implements INotificationTemplateContentInfo {}
