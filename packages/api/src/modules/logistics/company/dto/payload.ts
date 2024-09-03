import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 创建/更新物流公司 DTO
 */
export class LogisticsCompanyPayload {
  @ApiProperty({ description: '公司名称', example: '快递公司' })
  @MaxLength(32, { message: '公司名称长度不能超过 32 个字符' })
  @IsNotEmpty({ message: '公司名称不能为空' })
  @IsString({ message: '公司名称必须为字符串' })
  readonly name: string

  @ApiProperty({ required: false, description: '公司介绍', example: '快递公司介绍' })
  @MaxLength(255, { message: '公司介绍长度不能超过 255 个字符' })
  @IsString({ message: '公司介绍必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '公司官网', example: 'https://' })
  @MaxLength(32, { message: '公司官网长度不能超过 32 个字符' })
  @IsUrl({}, { message: '公司官网必须为 URL' })
  @IsString({ message: '公司官网必须为字符串' })
  @IsOptional()
  readonly url: string

  @ApiProperty({ required: false, description: '排序', default: 1 })
  @IsNumber({}, { message: '排序必须为数字' })
  @IsOptional()
  readonly sort: number
}
