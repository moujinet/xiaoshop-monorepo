import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

/**
 * 分页请求 DTO
 */
export class PaginationQueryDto {
  /**
   * 当前页码
   */
  @ApiProperty({ required: false, description: '当前页码', default: 1 })
  @IsOptional()
  @IsNumberString()
  page: number

  /**
   * 每页条数
   */
  @ApiProperty({ required: false, description: '每页条数', default: 10 })
  @IsOptional()
  @IsNumberString()
  pagesize: number
}
