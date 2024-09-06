import { NotificationScene, NotificationScope } from '@xiaoshop/shared'
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

export class GetNotificationTemplateListRequest {
  @ApiProperty({ required: false, description: '通知范围', enum: NotificationScope, example: example.scope })
  @IsNumberString({}, { message: '通知范围不正确' })
  @IsOptional()
  readonly scope: NotificationScope

  @ApiProperty({ required: false, description: '消息场景', enum: NotificationScene, example: example.scene })
  @IsNumberString({}, { message: '消息场景不正确' })
  @IsOptional()
  readonly scene: NotificationScene
}

export class GetNotificationTemplateRequest {
  @ApiProperty({ description: '消息模板 ID', example: 1 })
  @IsNumberString({}, { message: '消息模板 ID 不正确' })
  @IsNotEmpty({ message: '消息模板 ID 不能为空' })
  readonly id: number
}

export class GetNotificationTemplatePostRequest {
  @ApiProperty({ description: '消息模板 ID', example: 1 })
  @IsNumber({}, { message: '消息模板 ID 不正确' })
  @IsNotEmpty({ message: '消息模板 ID 不能为空' })
  readonly id: number
}
