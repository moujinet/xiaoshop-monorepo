import type { LogisticAddressType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetAddressPagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '地址类型不正确' })
  @IsOptional()
  readonly type?: LogisticAddressType
}

export class GetAddressListRequest {
  @IsNumberString({}, { message: '地址类型不正确' })
  @IsOptional()
  readonly type?: LogisticAddressType
}

export class GetAddressInfoRequest {
  @IsNumberString({}, { message: '地址 ID 不正确' })
  @IsNotEmpty({ message: '地址 ID 不能为空' })
  readonly id: number
}

export class DeleteAddressRequest {
  @IsNumber({}, { message: '地址 ID 不正确' })
  readonly id: number
}
