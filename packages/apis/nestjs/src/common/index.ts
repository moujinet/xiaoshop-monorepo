import { ApiProperty } from '@nestjs/swagger'
import { ILocation, ILocationCode } from '@xiaoshop/schema'
import { IsNumberString, IsOptional, IsString } from 'class-validator'

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

/**
 * 地区 DTO
 */
export class LocationDto implements ILocation {
  /**
   * 地区编码
   */
  @ApiProperty({ description: '地区编码', default: '11' })
  @IsString()
  readonly code: ILocationCode

  /**
   * 地区名称
   */
  @ApiProperty({ description: '地区名称', default: '北京市' })
  @IsString()
  readonly name: string
}
