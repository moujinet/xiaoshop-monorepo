import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { example } from '@/goods/tag/dto/example'

/**
 * 商品标签 DTO
 */
export class GoodsTagPayload {
  @ApiProperty({ description: '标签名称', example: example.name })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: '排序', example: example.sort })
  @IsNumber()
  @IsOptional()
  readonly sort: number
}
