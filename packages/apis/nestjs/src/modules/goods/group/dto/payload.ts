import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { example } from '@/goods/group/dto/example'

/**
 * 商品分组 DTO
 */
export class GoodsGroupPayload {
  @ApiProperty({ description: '商品分组名称', example: example.name })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: '排序', example: example.sort })
  @IsNumber()
  @IsOptional()
  readonly sort: number
}
