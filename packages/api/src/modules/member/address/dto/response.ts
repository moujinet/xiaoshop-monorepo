import type {
  ILocationPath,
  IMemberAccountInfo,
  IMemberAddress,
  IMemberAddressListItem,
  IMemberAddressMemberListItem,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'

/**
 * 获取会员收货地址响应 DTO
 */
export class MemberAddressResponse implements IMemberAddress {
  @ApiProperty({ description: '收货地址 ID' })
  readonly id: number

  @ApiProperty({ description: '会员 ID' })
  readonly memberId: number

  @ApiProperty({ description: '会员信息' })
  readonly member: IMemberAccountInfo

  @ApiProperty({ description: '联系人' })
  readonly name: string

  @ApiProperty({ description: '联系人手机' })
  readonly mobile: string

  @ApiProperty({ description: '城市' })
  readonly location: ILocationPath

  @ApiProperty({ description: '详细地址' })
  readonly address: string

  @ApiProperty({ description: '邮政编码' })
  readonly postalCode: string

  @ApiProperty({ description: '是否默认 (N:否 Y:是)' })
  readonly isDefault: YesOrNo

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 获取会员收货地址列表响应 DTO
 */
export class MemberAddressListResponse
  extends PickType(MemberAddressResponse, [
    'id',
    'member',
    'name',
    'mobile',
    'location',
    'address',
    'postalCode',
    'isDefault',
    'updatedTime',
  ] as const)
  implements IMemberAddressListItem {}

/**
 * 获取会员收货地址列表响应 - 会员 DTO
 */
export class MemberAddressMemberListResponse
  extends OmitType(MemberAddressListResponse, ['member'] as const)
  implements IMemberAddressMemberListItem {}
