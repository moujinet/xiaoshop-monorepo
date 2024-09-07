import type {
  IProductSkuAttribute,
  IProductSkuInfo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

export class ProductSkuInfoResponse implements IProductSkuInfo {
  @ApiProperty({ description: 'SKU ID', example: example.id })
  readonly id: number

  @ApiProperty({ description: '云链 ID', example: example.connectId })
  readonly connectId: string

  @ApiProperty({ description: '商品 ID', example: example.productId })
  readonly productId: number

  @ApiProperty({ description: '商品云链 ID', example: example.productConnectId })
  readonly productConnectId: string

  @ApiProperty({ description: 'SKU 编码', example: example.skuCode })
  readonly skuCode: string

  @ApiProperty({ description: 'SKU 名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: 'SKU 属性', example: example.attributes })
  readonly attributes: IProductSkuAttribute[]

  @ApiProperty({ description: 'SKU 图片', example: example.image })
  readonly image: string

  @ApiProperty({ description: '单价', example: example.price })
  readonly price: number

  @ApiProperty({ description: '原价', example: example.originalPrice })
  readonly originalPrice: number

  @ApiProperty({ description: '成本', example: example.costPrice })
  readonly costPrice: number

  @ApiProperty({ description: '库存', example: example.inventory })
  readonly inventory: number

  @ApiProperty({ description: '预警库存', example: example.inventoryEarlyWarning })
  readonly inventoryEarlyWarning: number

  @ApiProperty({ description: '重量', example: example.weight })
  readonly weight: number

  @ApiProperty({ description: '体积', example: example.volume })
  readonly volume: number

  @ApiProperty({ description: '商品单位', example: example.unit })
  readonly unit: string

  @ApiProperty({ description: '销量', example: example.sales })
  readonly sales: number
}
