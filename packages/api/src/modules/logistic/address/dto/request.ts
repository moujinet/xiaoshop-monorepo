import { LogisticAddressType, YesOrNo } from '@xiaoshop/shared'
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator'

/**
 * Query Logistic Address List
 */
export class GetLogisticAddressListRequest {
  @IsNumberString({}, { message: '地址类型不正确' })
  readonly type: LogisticAddressType

  @IsNumberString({}, { message: '是否默认地址不正确' })
  @IsOptional()
  readonly isDefault?: YesOrNo
}

/**
 * Get Logistic Address
 */
export class GetLogisticAddressRequest {
  @IsNumberString({}, { message: '地址 ID 不正确' })
  @IsNotEmpty({ message: '地址 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Logistic Address
 */
export class DeleteLogisticAddressRequest {
  @IsNumber({}, { message: '地址 ID 不正确' })
  readonly id: number
}

/**
 * Query Logistic Member Address List
 */
export class GetLogisticMemberAddressListRequest {
  @IsNumberString({}, { message: '会员 ID 不正确' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly memberId: number

  @IsNumberString({}, { message: '地址类型不正确' })
  readonly type: LogisticAddressType

  @IsNumberString({}, { message: '是否默认地址不正确' })
  @IsOptional()
  readonly isDefault?: YesOrNo
}

/**
 * Get Logistic Member Address
 */
export class GetLogisticMemberAddressRequest {
  @IsNumberString({}, { message: '会员 ID 不正确' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly memberId: number

  @IsNumberString({}, { message: '地址 ID 不正确' })
  @IsNotEmpty({ message: '地址 ID 不能为空' })
  readonly id: number
}
