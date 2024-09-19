import { IsNumberString, IsOptional } from 'class-validator'

/**
 * 分页请求 DTO
 */
export class PaginationRequest {
  /**
   * 当前页码
   */
  @IsNumberString({}, { message: '页码必须为数字' })
  @IsOptional()
  readonly page: number

  /**
   * 每页条数
   */
  @IsNumberString({}, { message: '每页条数必须为数字' })
  @IsOptional()
  readonly pagesize: number
}
