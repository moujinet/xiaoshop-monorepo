import type { IGoodsSkuFormData, IGoodsSkuSpec, IGoodsSpec } from '@xiaoshop/schema'
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { example } from './example'
import { nanoid } from '~/utils'
import { GoodsSpecResponse } from '@/goods/spec/dto'

/**
 * 商品 SKU 规格 DTO
 */
export class GoodsSkuSpecPayload implements IGoodsSkuSpec {
  @ApiProperty({ required: false, description: '规格 ID', example: example.specs[0].specId })
  @IsString()
  @IsOptional()
  readonly specId: string

  @ApiProperty({ description: '规格名', example: example.specs[0].name })
  @IsString()
  readonly name: string

  @ApiProperty({ description: '规格值', example: example.specs[0].value })
  @IsString()
  readonly value: string
}

/**
 * 创建/更新商品 SKU DTO
 */
export class GoodsSkuPayload implements IGoodsSkuFormData {
  @ApiProperty({ required: false, description: 'SKU ID', example: nanoid() })
  @IsString()
  @IsOptional()
  readonly id: string

  @ApiProperty({ required: false, description: 'SKU 编码', example: example.skuCode })
  @IsString()
  @IsOptional()
  readonly skuCode: string

  @ApiProperty({ description: '商品名称', example: example.name })
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: 'SKU 图片', example: example.image })
  @IsString()
  @IsOptional()
  readonly image: string

  @ApiProperty({ type: [GoodsSkuSpecPayload], description: '商品规格', example: example.specs })
  @ValidateNested()
  @Type(() => GoodsSkuSpecPayload)
  readonly specs: IGoodsSkuSpec[]

  @ApiProperty({ required: false, type: 'float', description: '商品价格', example: example.price })
  @IsNumber()
  @IsOptional()
  readonly price: number

  @ApiProperty({ required: false, type: 'float', description: '商品原价', example: example.originalPrice })
  @IsNumber()
  @IsOptional()
  readonly originalPrice: number

  @ApiProperty({ required: false, type: 'float', description: '商品成本价', example: example.costPrice })
  @IsNumber()
  @IsOptional()
  readonly costPrice: number

  @ApiProperty({ required: false, description: '商品库存', example: example.stock })
  @IsNumber()
  @IsOptional()
  readonly stock: number

  @ApiProperty({ required: false, description: '预警库存', example: example.alertStock })
  @IsNumber()
  @IsOptional()
  readonly alertStock: number

  @ApiProperty({ required: false, type: 'float', description: '商品重量', example: example.weight })
  @IsNumber()
  @IsOptional()
  readonly weight: number

  @ApiProperty({ required: false, type: 'float', description: '商品体积', example: example.volume })
  @IsNumber()
  @IsOptional()
  readonly volume: number
}

/**
 * 更新商品多规格
 */
export class UpdateGoodsSkusPayload {
  @ApiProperty({ type: [GoodsSpecResponse], description: '商品多规格设置' })
  @ValidateNested()
  @Type(() => GoodsSpecResponse)
  readonly specs: IGoodsSpec[]

  @ApiProperty({ type: [GoodsSkuPayload], description: '商品多规格 SKU' })
  @ValidateNested()
  @Type(() => GoodsSkuPayload)
  readonly skus: IGoodsSkuFormData[]
}
