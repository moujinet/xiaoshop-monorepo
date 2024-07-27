import {
  Enabled,
  type IEnabled,
  type IGoodsSpec,
  type IGoodsSpecValue,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { example } from './example'
import { nanoid } from '~/utils'

/**
 * 商品规格值 DTO
 */
export class GoodsSpecValuePayload implements IGoodsSpecValue {
  @ApiProperty({ description: '规格值', example: example.values[0].name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ required: false, description: '图片', example: example.values[0].image })
  @IsString()
  @IsOptional()
  readonly image: string
}

/**
 * 商品规格 DTO
 */
export class GoodsSpecPayload implements IGoodsSpec {
  @ApiProperty({ required: false, description: '规格 ID', example: nanoid() })
  @IsString()
  @IsOptional()
  readonly id: string

  @ApiProperty({ description: '规格名', example: example.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ type: [GoodsSpecValuePayload], description: '规格值', example: example.values })
  @ValidateNested()
  @Type(() => GoodsSpecValuePayload)
  readonly values: IGoodsSpecValue[]

  @ApiProperty({ enum: Enabled, description: '启用图片', example: example.enableImage })
  @IsEnum(Enabled)
  readonly enableImage: IEnabled
}
