import type { SystemNotificationStatus } from '@xiaoshop/shared'

import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetSystemNotificationPagesRequest extends PaginationRequest {}

export class GetSystemNotificationListRequest {
  @IsNumberString({}, { message: '通知状态不正确' })
  @IsOptional()
  readonly status?: SystemNotificationStatus

  @IsNumberString({}, { message: '数量不正确' })
  @IsOptional()
  readonly take?: number
}

export class GetSystemNotificationInfoRequest {
  @IsNumberString({}, { message: '通知 ID 不正确' })
  @IsNotEmpty({ message: '通知 ID 不能为空' })
  readonly id: number
}

export class DeleteSystemNotificationRequest {
  @IsNumber({}, { each: true, message: '通知 ID 不正确' })
  @ArrayNotEmpty({ message: '通知 ID 不能为空' })
  readonly ids: number[]
}
