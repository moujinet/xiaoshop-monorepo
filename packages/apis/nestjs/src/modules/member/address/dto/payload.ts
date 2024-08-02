import {
  Enabled,
  type IEnabled,
  type ILocationPath,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPostalCode, IsString } from 'class-validator'
import { example } from './example'
import { LocationDto } from '~/common'

/**
 * 会员收货地址 DTO
 */
export class MemberAddressPayload {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber({}, { message: '会员 ID 必须为数值' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly memberId: number

  @ApiProperty({ description: '联系人', example: example.contractName })
  @IsString({ message: '联系人必须为字符串' })
  @IsNotEmpty({ message: '联系人不能为空' })
  readonly contractName: string

  @ApiProperty({ description: '手机号', example: example.mobile })
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string

  @ApiProperty({ type: [LocationDto], description: '城市', example: example.location })
  @IsArray()
  @ArrayNotEmpty({ message: '城市不能为空' })
  @Type(() => LocationDto)
  readonly location: ILocationPath

  @ApiProperty({ description: '详细地址', example: example.address })
  @IsString()
  @IsNotEmpty({ message: '详细地址不能为空' })
  readonly address: string

  @ApiProperty({ required: false, description: '邮政编码', example: example.postCode })
  @IsPostalCode('CN', { message: '邮政编码格式不正确' })
  @IsOptional()
  readonly postCode: string

  @ApiProperty({ required: false, description: '是否默认', example: example.isDefault })
  @IsEnum(Enabled, { message: '是否默认格式不正确' })
  @IsOptional()
  readonly isDefault: IEnabled
}
