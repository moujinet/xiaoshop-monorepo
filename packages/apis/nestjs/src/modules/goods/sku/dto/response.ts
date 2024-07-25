import type { IGoodsSku, IGoodsSkuSpec } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { nanoid } from '~/utils'

/**
 * 商品 SKU 响应 DTO
 */
export class GoodsSkuResponse implements IGoodsSku {
  @ApiProperty({ description: 'SKU ID', example: nanoid() })
  readonly id: string

  @ApiProperty({ description: 'SKU 编码', example: example.skuCode })
  readonly skuCode: string

  @ApiProperty({ description: '商品名称', example: example.name })
  readonly name: string

  @ApiProperty({ required: false, description: 'SKU 图片', example: example.image })
  readonly image: string

  @ApiProperty({ description: 'SKU 规格', example: example.specs })
  readonly specs: IGoodsSkuSpec[]

  @ApiProperty({ type: 'float', description: 'SKU 单价', example: example.price })
  readonly price: number

  @ApiProperty({ type: 'float', description: 'SKU 原价', example: example.originalPrice })
  readonly originalPrice: number

  @ApiProperty({ type: 'float', description: 'SKU 成本价', example: example.costPrice })
  readonly costPrice: number

  @ApiProperty({ description: 'SKU 库存', example: example.stock })
  readonly stock: number

  @ApiProperty({ description: 'SKU 预警库存', example: example.alertStock })
  readonly alertStock: number

  @ApiProperty({ type: 'float', description: 'SKU 重量', example: example.weight })
  readonly weight: number

  @ApiProperty({ type: 'float', description: 'SKU 体积', example: example.volume })
  readonly volume: number

  @ApiProperty({ description: 'SKU 销量', example: example.sales })
  readonly sales: number

  @ApiProperty({ description: 'SKU 浏览量', example: example.views })
  readonly views: number

  @ApiProperty({ description: 'SKU 收藏量', example: example.favorites })
  readonly favorites: number
}
