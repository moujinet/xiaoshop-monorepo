import type {
  IEnabled,
  ILocationPath,
  IMemberAddress,
  IMemberAddressInfo,
  IMemberAddressListItem,
} from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 会员收货地址信息响应 DTO
 */
export class MemberAddressResponse implements IMemberAddress {
  @ApiProperty({ description: '会员收货地址 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '会员 ID', example: 1 })
  readonly memberId: number

  @ApiProperty({ description: '联系人', example: example.contractName })
  readonly contractName: string

  @ApiProperty({ description: '手机号', example: example.mobile })
  readonly mobile: string

  @ApiProperty({ description: '城市', example: example.location })
  readonly location: ILocationPath

  @ApiProperty({ description: '详细地址', example: example.address })
  readonly address: string

  @ApiProperty({ description: '是否默认', example: example.isDefault })
  readonly isDefault: IEnabled

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 会员收货地址列表响应 DTO
 */
export class MemberAddressListResponse
  extends PickType(MemberAddressResponse, [
    'id',
    'contractName',
    'mobile',
    'location',
    'address',
    'isDefault',
    'updatedTime',
  ] as const)
  implements IMemberAddressListItem {}

/**
 * 会员收货地址信息响应 DTO
 */
export class MemberAddressInfoResponse
  extends PickType(MemberAddressResponse, [
    'id',
    'contractName',
    'mobile',
    'location',
    'address',
  ] as const)
  implements IMemberAddressInfo {}
