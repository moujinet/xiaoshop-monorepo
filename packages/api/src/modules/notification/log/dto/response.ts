import {
  INotificationLog,
  INotificationLogListItem,
  INotificationTemplateInfo,
  NotificationChannel,
  NotificationScene,
  NotificationScope,
  NotificationSendStatus,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class NotificationLogResponse implements INotificationLog {
  @ApiProperty({ description: '日志 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '消息通知范围', enum: NotificationScope, example: example.scope })
  readonly scope: NotificationScope

  @ApiProperty({ description: '消息通知发送状态', enum: NotificationSendStatus, example: example.status })
  readonly status: NotificationSendStatus

  @ApiProperty({ description: '消息类别', enum: NotificationScene, example: example.scene })
  readonly scene: NotificationScene

  @ApiProperty({ description: '消息发送通道', example: example.channel })
  readonly channel: NotificationChannel

  @ApiProperty({ description: '接收会员 ID', example: 1 })
  readonly memberId: number

  @ApiProperty({ description: '消息通知模板 ID', example: 1 })
  readonly templateId: number

  @ApiProperty({ description: '消息通知模板信息', example: example.template })
  readonly template: INotificationTemplateInfo

  @ApiProperty({ description: '消息通知发送目标 (用户名, 邮箱地址, 手机号...)', example: example.sendTo })
  readonly sendTo: string

  @ApiProperty({ description: '消息通知标题', example: example.title })
  readonly title: string

  @ApiProperty({ description: '消息通知内容', example: example.content })
  readonly content: string

  @ApiProperty({ description: '消息通知发送结果', example: example.result })
  readonly result: string

  @ApiProperty({ description: '创建时间', example: '2021-01-01 00:00:00' })
  readonly createdTime: string
}

export class NotificationLogListResponse
  extends PickType(NotificationLogResponse, [
    'id',
    'scope',
    'status',
    'scene',
    'channel',
    'memberId',
    'template',
    'sendTo',
    'title',
    'createdTime',
  ] as const)
  implements INotificationLogListItem {}
