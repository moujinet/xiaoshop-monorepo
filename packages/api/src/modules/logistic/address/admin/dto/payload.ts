import type { ILocationPath, LogisticAddressType, YesOrNo } from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsPostalCode, IsString, ValidateNested } from 'class-validator'

import { Location } from '~/common/dto'

export class AddressPayload {
  @IsString({ message: '联系人不正确' })
  @IsNotEmpty({ message: '联系人不能为空' })
  readonly name: string

  @IsPhoneNumber('CN', { message: '手机号不正确' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string

  @ValidateNested({ each: true })
  @IsArray({ message: '所在城市不正确' })
  @ArrayNotEmpty({ message: '所在城市不能为空' })
  @Type(() => Location)
  readonly location: ILocationPath

  @IsString({ message: '详细地址不正确' })
  @IsNotEmpty({ message: '详细地址不能为空' })
  readonly address: string

  @IsString({ message: '座机号码不正确' })
  @IsOptional()
  readonly landline?: string

  @IsPostalCode('CN', { message: '邮政编码不正确' })
  @IsOptional()
  readonly postalCode?: string

  @IsNumber({}, { message: '是否默认地址不正确' })
  @IsOptional()
  readonly isDefault?: YesOrNo

  @IsNumber({}, { message: '地址类型不正确' })
  @IsOptional()
  readonly type?: LogisticAddressType
}
