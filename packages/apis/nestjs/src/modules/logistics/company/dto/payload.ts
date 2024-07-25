import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, ValidateIf } from 'class-validator'

/**
 * 创建物流公司 DTO
 */
export class LogisticsCompanyPayload {
  @ApiProperty({ description: '公司名称', example: '快递公司' })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: '公司介绍', example: '快递公司介绍' })
  @MaxLength(64)
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '公司官网', example: 'https://' })
  @ValidateIf(o => o.url !== '')
  @MaxLength(32)
  @IsUrl()
  @IsString()
  @IsOptional()
  readonly url: string

  @ApiProperty({ required: false, description: '排序', default: 1 })
  @IsNumber()
  @IsOptional()
  readonly sort: number
}
