import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'
import { PaginationQueryDto } from '~/common'

/**
 * 获取会员积分变化分页列表请求 DTO
 */
export class GetMemberPointsChangeLogPagesRequest extends PaginationQueryDto {
  @ApiProperty({ required: false, description: '会员 ID', example: 1 })
  @IsNumberString()
  @IsOptional()
  readonly memberId: number
}
