import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator'
import { PaginationRequest } from '~/common/dto'

/**
 * 获取会员收货地址分页列表请求 DTO
 */
export class GetMemberAddressPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '会员 ID' })
  @IsNumberString({}, { message: '会员 ID 必须是数字' })
  @IsOptional()
  readonly memberId: number
}

/**
 * 获取会员收货地址请求 DTO
 */
export class GetMemberAddressPagesByMemberRequest extends PaginationRequest {
  @ApiProperty({ description: '会员 ID' })
  @IsNumberString({}, { message: '会员 ID 必须是数字' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly memberId: number
}
