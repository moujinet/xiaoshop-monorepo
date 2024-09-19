import type {
  SystemMessageChannel,
  SystemMessageScene,
  SystemMessageSendStatus,
  SystemMessageType,
} from '@xiaoshop/shared'

import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetSystemMessageLogPagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '消息类型不正确' })
  @IsOptional()
  readonly type?: SystemMessageType

  @IsNumberString({}, { message: '消息场景不正确' })
  @IsOptional()
  readonly scene?: SystemMessageScene

  @IsNumberString({}, { message: '发送通道不正确' })
  @IsOptional()
  readonly channel?: SystemMessageChannel

  @IsNumberString({}, { message: '消息模板 ID 不正确' })
  @IsOptional()
  readonly templateId?: number

  @IsString({ message: '接收人不正确' })
  @IsOptional()
  readonly receiver?: string

  @IsNumberString({}, { message: '发送状态不正确' })
  @IsOptional()
  readonly status?: SystemMessageSendStatus

  @IsString({ message: '发送时间不正确' })
  @IsOptional()
  readonly sentTime?: string
}

export class GetSystemMessageLogInfoRequest {
  @IsNumberString({}, { message: '消息 ID 不正确' })
  @IsNotEmpty({ message: '消息 ID 不能为空' })
  readonly id: number
}
