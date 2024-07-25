import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { example } from './example'

/**
 * 商品分类请求 DTO
 */
export class GoodsCategoryPayload {
  @ApiProperty({ required: false, description: '父分类 ID', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly parentId: number

  @ApiProperty({ description: '分类名称', example: example.name })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: '分类图片', example: example.image })
  @IsString()
  @IsOptional()
  readonly image: string

  @ApiProperty({ required: false, description: '排序', example: example.sort })
  @IsNumber()
  @IsOptional()
  readonly sort: number
}
