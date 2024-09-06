import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString } from 'class-validator'

export class GetNotificationTemplateContentListRequest {
  @ApiProperty({ description: '消息通知模板 ID', example: 1 })
  @IsNumberString({}, { message: '消息通知模板 ID 必须为数字' })
  readonly templateId: number
}

export class GetNotificationTemplateContentRequest {
  @ApiProperty({ description: '消息通知模板内容 ID', example: 1 })
  @IsNumberString({}, { message: '消息通知模板内容 ID 必须为数字' })
  readonly id: number
}
