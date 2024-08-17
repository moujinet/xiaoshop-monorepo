import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

/**
 * 分页请求 DTO
 */
export class PaginationRequest {
  /**
   * 当前页码
   */
  @ApiProperty({ required: false, description: '当前页码', default: 1 })
  @IsNumberString({ no_symbols: true }, { message: '页码必须为数字' })
  @IsOptional()
  readonly page: number

  /**
   * 每页条数
   */
  @ApiProperty({ required: false, description: '每页条数', default: 10 })
  @IsNumberString({ no_symbols: true }, { message: '每页条数必须为数字' })
  @IsOptional()
  readonly pagesize: number
}
