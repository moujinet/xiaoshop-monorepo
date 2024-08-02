import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'
import { PaginationQueryDto } from '~/common'

/**
 * 获取会员分组分页列表请求 DTO
 */
export class GetMemberGroupPagesRequest extends PaginationQueryDto {}

/**
 * 获取会员群体请求 DTO
 */
export class GetMemberGroupRequest {
  @ApiProperty({ description: '会员群体 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除会员群体请求 DTO
 */
export class DeleteMemberGroupRequest {
  @ApiProperty({ description: '会员群体 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
