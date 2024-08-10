import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'
import { PaginationQueryDto } from '~/common'

/**
 * 获取会员收货地址分页列表请求 DTO
 */
export class GetMemberAddressPagesRequest extends PaginationQueryDto {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  readonly memberId: number
}

/**
 * 获取会员收货地址请求 DTO
 */
export class GetMemberAddressListRequest {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumberString()
  readonly memberId: number
}

/**
 * 获取会员收货地址请求 DTO
 */
export class GetMemberAddressByMemberIdRequest {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumberString()
  readonly memberId: number
}

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
