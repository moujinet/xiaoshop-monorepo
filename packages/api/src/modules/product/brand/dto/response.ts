import type {
  IProductBrand,
  IProductBrandDict,
  IProductBrandListItem,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class ProductBrandResponse implements IProductBrand {
  @ApiProperty({ description: '商品品牌ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '商品品牌名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品品牌 LOGO', example: example.logo })
  readonly logo: string

  @ApiProperty({ description: '商品品牌描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间', example: '2021-05-20T08:20:53.000Z' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间', example: '2021-05-20T08:20:53.000Z' })
  readonly updatedTime: string
}

export class ProductBrandDictResponse
  extends PickType(ProductBrandResponse, [
    'id',
    'name',
  ] as const)
  implements IProductBrandDict {}

export class ProductBrandListResponse
  extends PickType(ProductBrandResponse, [
    'id',
    'name',
    'logo',
    'desc',
    'sort',
    'updatedTime',
  ] as const)
  implements IProductBrandListItem {}
