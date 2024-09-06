import { ArrayMinSize, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { NotificationChannel, YesOrNo } from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class UpdateNotificationTemplatePayload {
  @ApiProperty({ description: '启用状态', enum: YesOrNo, example: example.enable })
  @IsNumber({}, { message: '启用状态不正确' })
  @Min(0, { message: '启用状态不正确' })
  readonly enable: YesOrNo

  @ApiProperty({ description: '消息发送通道', enum: NotificationChannel, example: example.channels })
  @IsNumber({}, { message: '消息发送通道不正确' })
  @ArrayMinSize(1, { message: '消息发送通道不能为空' })
  readonly channels: NotificationChannel[]

  @ApiProperty({ description: '消息通知模板名称', example: example.name })
  @IsString({ message: '消息通知模板名称不正确' })
  @IsNotEmpty({ message: '消息通知模板名称不能为空' })
  readonly name: string

  @ApiProperty({ description: '消息通知模板描述', example: example.desc })
  @IsString({ message: '消息通知模板描述不正确' })
  @IsNotEmpty({ message: '消息通知模板描述不能为空' })
  readonly desc: string
}

export class UpdateNotificationTemplateStatusPayload
  extends PickType(UpdateNotificationTemplatePayload, [
    'enable',
  ] as const) {}
