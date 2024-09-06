import { ApiProperty, PickType } from '@nestjs/swagger'
import {
  type INotificationTemplate,
  INotificationTemplateContentInfo,
  INotificationTemplateListItem,
  NotificationChannel,
  NotificationScene,
  NotificationScope,
  YesOrNo,
} from '@xiaoshop/shared'
import { example } from './example'

export class NotificationTemplateResponse implements INotificationTemplate {
  @ApiProperty({ description: '消息模板 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '消息模板标识', example: example.key })
  readonly key: string

  @ApiProperty({ description: '启用状态', enum: YesOrNo, example: example.enable })
  readonly enable: YesOrNo

  @ApiProperty({ description: '消息通知范围', enum: NotificationScope, example: example.scope })
  readonly scope: NotificationScope

  @ApiProperty({ description: '消息场景', enum: NotificationScene, example: example.scene })
  readonly scene: NotificationScene

  @ApiProperty({ description: '消息发送通道', enum: NotificationChannel, example: example.channels })
  readonly channels: NotificationChannel[]

  @ApiProperty({ description: '消息通知模板名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '消息通知模板描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '消息通知模板内容', example: example.contents })
  readonly contents: INotificationTemplateContentInfo[]

  @ApiProperty({ description: '更新时间', example: example.updatedTime })
  readonly updatedTime: string
}

export class NotificationTemplateListResponse
  extends PickType(NotificationTemplateResponse, [
    'id',
    'key',
    'enable',
    'scope',
    'scene',
    'channels',
    'name',
    'desc',
    'updatedTime',
  ] as const)
  implements INotificationTemplateListItem {}
