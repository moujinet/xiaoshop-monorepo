import type { ILocationPath, LogisticAddressType, YesOrNo } from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator'

import { LocationDto } from '~/common/dto'

/**
 * Create Logistic Address
 */
export class CreateLogisticAddressPayload {
  @IsNumber({}, { message: '会员 ID 不正确' })
  @IsOptional()
  readonly memberId?: number

  @IsNumber({}, { message: '地址类型不正确' })
  @IsOptional()
  readonly type?: LogisticAddressType

  @IsNumber({}, { message: '是否默认地址不正确' })
  @IsOptional()
  readonly isDefault?: YesOrNo

  @IsString({ message: '联系人不正确' })
  @IsNotEmpty({ message: '联系人不能为空' })
  readonly name: string

  @IsPhoneNumber('CN', { message: '手机号不正确' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string

  @IsString({ message: '固定电话不正确' })
  @IsOptional()
  readonly landline?: string

  @Type(() => LocationDto)
  @ArrayNotEmpty({ message: '地址不能为空' })
  @ValidateNested({ each: true })
  readonly location: ILocationPath

  @IsString({ message: '地址不正确' })
  @IsNotEmpty({ message: '地址不能为空' })
  readonly address: string

  @IsString({ message: '邮政编码不正确' })
  @IsOptional()
  readonly postalCode?: string
}

/**
 * Update Logistic Address
 */
export class UpdateLogisticAddressPayload extends CreateLogisticAddressPayload {}
