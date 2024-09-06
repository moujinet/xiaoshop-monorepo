import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { example } from './example'

export class UpdateNotificationTemplateContentPayload {
  @ApiProperty({ description: '消息通知标题', example: example.title })
  @IsString({ message: '消息通知标题必须为字符串' })
  readonly title: string

  @ApiProperty({ description: '消息通知内容', example: example.content })
  @IsString({ message: '消息通知内容必须为字符串' })
  readonly content: string
}
