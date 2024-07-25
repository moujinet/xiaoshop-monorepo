import {
  EnabledEnum,
  type IEnabled,
  type IMemberAddress,
  type IMemberAddressInfo,
} from '@xiaoshop/schema'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 获取会员地址响应 DTO
 */
export class MemberAddressResponse implements IMemberAddress {
  @ApiProperty({ description: '会员地址 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '会员 ID', example: 1 })
  readonly memberId: number

  @ApiProperty({ description: '联系人', example: example.contractName })
  readonly contractName: string

  @ApiProperty({ description: '手机号', example: example.contractName })
  readonly mobile: string

  @ApiProperty({ type: [String], description: '城市', example: example.location })
  readonly location: string[]

  @ApiProperty({ description: '详细地址', example: example.address })
  readonly address: string

  @ApiProperty({ description: '邮政编码', example: example.postCode })
  readonly postCode: string

  @ApiProperty({ description: '是否默认', enum: EnabledEnum, example: example.isDefault })
  readonly isDefault: IEnabled

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 会员地址关联响应 DTO
 */
export class MemberAddressRelationResponse
  extends OmitType(MemberAddressResponse, ['postCode', 'isDefault', 'createdTime', 'updatedTime'])
  implements IMemberAddressInfo {}
