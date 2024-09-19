import type {
  SystemMessageChannel,
  SystemMessageScene,
  SystemMessageSendStatus,
  SystemMessageType,
} from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, NotEquals } from 'class-validator'

export class SystemMessageLogPayload {
  @IsNumber({}, { message: '消息类型不正确' })
  @NotEquals(0, { message: '消息类型不正确' })
  readonly type: SystemMessageType

  @IsNumber({}, { message: '消息场景不正确' })
  @NotEquals(0, { message: '消息场景不正确' })
  readonly scene: SystemMessageScene

  @IsNumber({}, { message: '发送通道不正确' })
  @NotEquals(0, { message: '发送通道不正确' })
  readonly channel: SystemMessageChannel

  @IsNumber({}, { message: '消息模板 ID 不正确' })
  @NotEquals(0, { message: '消息模板 ID 不正确' })
  readonly templateId: number

  @IsString({ message: '接收人不正确' })
  @IsNotEmpty({ message: '接收人不能为空' })
  readonly title: string

  @IsString({ message: '消息内容不正确' })
  @IsNotEmpty({ message: '消息内容不能为空' })
  readonly content: string

  @IsObject({ message: '附加数据不正确' })
  @IsOptional()
  readonly extras?: Record<string, any>

  @IsString({ message: '接收人不正确' })
  @IsNotEmpty({ message: '接收人不能为空' })
  readonly receiver: string

  @IsNumber({}, { message: '发送状态不正确' })
  @NotEquals(0, { message: '发送状态不正确' })
  readonly status: SystemMessageSendStatus

  @IsString({ message: '发送结果不正确' })
  @IsOptional()
  readonly result?: string
}
