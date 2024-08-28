import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'
import { PaginationRequest } from '~/common/dto'

/**
 * 获取会员标签分页列表请求 DTO
 */
export class GetMemberTagPagesRequest extends PaginationRequest {}

/**
 * 获取会员标签请求 DTO
 */
export class GetMemberTagRequest {
  @ApiProperty({ description: '会员标签 ID', example: 1 })
  @IsNumberString({}, { message: '会员标签 ID 必须为数字' })
  readonly id: number
}

/**
 * 删除会员标签请求 DTO
 */
export class DeleteMemberTagRequest {
  @ApiProperty({ description: '会员标签 ID', example: 1 })
  @IsNumber({}, { message: '会员标签 ID 必须为数字' })
  readonly id: number
}
