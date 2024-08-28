import { IsNumber, IsNumberString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '~/common/dto'

/**
 * 获取会员分组分页列表请求 DTO
 */
export class GetMemberGroupPagesRequest extends PaginationRequest {}

/**
 * 获取会员群体请求 DTO
 */
export class GetMemberGroupRequest {
  @ApiProperty({ description: '会员群体 ID', example: 1 })
  @IsNumberString({}, { message: '会员群体 ID 不正确' })
  readonly id: number
}

/**
 * 删除会员群体请求 DTO
 */
export class DeleteMemberGroupRequest {
  @ApiProperty({ description: '会员群体 ID', example: 1 })
  @IsNumber({}, { message: '会员群体 ID 不正确' })
  readonly id: number
}
