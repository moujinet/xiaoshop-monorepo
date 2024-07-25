import { EnabledEnum, type IEnabled } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsPostalCode, IsString } from 'class-validator'
import { example } from './example'

/**
 * 创建会员地址 DTO
 */
export class MemberAddressPayload {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber()
  readonly memberId: number

  @ApiProperty({ description: '联系人', example: example.contractName })
  @IsString()
  @IsNotEmpty()
  readonly contractName: string

  @ApiProperty({ description: '手机号', example: example.contractName })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  readonly mobile: string

  @ApiProperty({ type: [String], description: '城市', example: example.location })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly location: string[]

  @ApiProperty({ description: '详细地址', example: example.address })
  @IsString()
  @IsNotEmpty()
  readonly address: string

  @ApiProperty({ description: '邮政编码', example: example.postCode })
  @IsPostalCode('CN')
  @IsNotEmpty()
  readonly postCode: string

  @ApiProperty({ description: '是否默认', enum: EnabledEnum, example: example.isDefault })
  @IsEnum(EnabledEnum)
  readonly isDefault: IEnabled
}
