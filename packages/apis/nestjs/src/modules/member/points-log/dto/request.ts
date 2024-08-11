import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString } from 'class-validator'
import { PaginationQueryDto } from '~/common'

/**
 * 获取会员积分日志分页列表请求 DTO
 */
export class GetMemberPointsLogPagesRequest extends PaginationQueryDto {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  readonly memberId: number
}
