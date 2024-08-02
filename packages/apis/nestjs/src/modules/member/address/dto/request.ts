import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'
import { PaginationQueryDto } from '~/common'

/**
 * 获取会员收货地址分页列表请求 DTO
 */
export class GetMemberAddressPagesRequest extends PaginationQueryDto {}

/**
 * 获取会员收货地址请求 DTO
 */
export class GetMemberAddressRequest {
  @ApiProperty({ description: '会员收货地址 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除会员收货地址请求 DTO
 */
export class DeleteMemberAddressRequest {
  @ApiProperty({ description: '会员收货地址 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
