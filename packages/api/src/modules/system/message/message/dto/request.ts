import type { SystemMessageStatus, SystemMessageType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetSystemMessagePagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '消息类型不正确' })
  @IsNotEmpty({ message: '消息类型不能为空' })
  readonly type: SystemMessageType
}

export class GetSystemMessageListRequest {
  @IsNumberString({}, { message: '消息类型不正确' })
  @IsNotEmpty({ message: '消息类型不能为空' })
  readonly type: SystemMessageType

  @IsNumberString({}, { message: '消息状态不正确' })
  @IsOptional()
  readonly status?: SystemMessageStatus

  @IsNumberString({}, { message: '数量不正确' })
  @IsOptional()
  readonly take?: number
}

export class GetSystemMessageInfoRequest {
  @IsNumberString({}, { message: '消息 ID 不正确' })
  @IsNotEmpty({ message: '消息 ID 不能为空' })
  readonly id: number
}
