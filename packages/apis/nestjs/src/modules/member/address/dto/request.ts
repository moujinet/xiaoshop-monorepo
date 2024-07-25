import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

/**
 * 根据会员获取会员地址请求 DTO
 */
export class GetMemberAddressByMemberRequest {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  readonly memberId: number
}

/**
 * 获取会员地址请求 DTO
 */
export class GetMemberAddressRequest {
  @ApiProperty({ description: '会员地址 ID', example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  readonly id: number

  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  readonly memberId: number
}

/**
 * 获取会员地址请求 DTO
 */
export class GetMemberAddressByIdRequest {
  @ApiProperty({ description: '会员地址 ID', example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  readonly id: number
}

/**
 * 删除会员地址请求 DTO
 */
export class DeleteMemberAddressRequest {
  @ApiProperty({ description: '会员地址 ID', example: 1 })
  @IsNumber()
  readonly id: number

  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber()
  readonly memberId: number
}
