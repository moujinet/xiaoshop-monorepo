import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { example } from './example'

/**
 * 商品品牌请求 DTO
 */
export class GoodsBrandPayload {
  @ApiProperty({ description: '品牌名称', example: example.name })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: '品牌介绍', example: example.desc })
  @MaxLength(200)
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '品牌 LOGO', example: example.logo })
  @IsString()
  @IsOptional()
  readonly logo: string

  @ApiProperty({ required: false, description: '排序', example: example.sort })
  @IsNumber()
  @IsOptional()
  readonly sort: number
}
