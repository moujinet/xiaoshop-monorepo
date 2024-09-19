import type { SystemMessageChannel } from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

export class SystemMessageTemplateContentPayload {
  @IsNumber({}, { message: '消息通道不正确' })
  readonly channel: SystemMessageChannel

  @IsString({ message: '消息标题不正确' })
  @IsNotEmpty({ message: '消息标题不能为空' })
  readonly title: string

  @IsString({ message: '消息内容不正确' })
  @IsNotEmpty({ message: '消息内容不能为空' })
  readonly content: string
}

export class SystemMessageTemplatePayload {
  @IsString({ message: '模板名称不正确' })
  @IsNotEmpty({ message: '模板名称不能为空' })
  readonly name: string

  @IsString({ message: '模板描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsNumber({}, { each: true, message: '消息通道不正确' })
  @ArrayNotEmpty({ message: '消息通道不能为空' })
  readonly channels: SystemMessageChannel[]

  @ValidateNested()
  @Type(() => SystemMessageTemplateContentPayload)
  @ArrayNotEmpty({ message: '消息模板内容不能为空' })
  readonly contents: SystemMessageTemplateContentPayload[]
}
