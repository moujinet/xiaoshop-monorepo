import { IsNumberString, IsOptional } from 'class-validator'

/**
 * 分页请求 DTO
 */
export class PaginationDto {
  /**
   * 当前页码
   */
  @IsNumberString({}, { message: '当前页码不正确' })
  @IsOptional()
  readonly page: number

  /**
   * 每页条数
   */
  @IsNumberString({}, { message: '每页条数不正确' })
  @IsOptional()
  readonly pagesize: number
}
