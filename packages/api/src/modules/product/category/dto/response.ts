import type {
  IProductCategory,
  IProductCategoryDict,
  IProductCategoryListItem,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class ProductCategoryResponse implements IProductCategory {
  @ApiProperty({ description: '商品分类 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '父分类 ID', example: 0 })
  readonly parentId: number

  @ApiProperty({ description: '商品分类名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品分类图片', example: example.image })
  readonly image: string

  @ApiProperty({ description: '商品分类描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间', example: '2021-05-20T08:20:53.000Z' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间', example: '2021-05-20T08:20:53.000Z' })
  readonly updatedTime: string
}

export class ProductCategoryDictResponse
  extends PickType(ProductCategoryResponse, [
    'id',
    'parentId',
    'name',
  ] as const)
  implements IProductCategoryDict {}

export class ProductCategoryListResponse
  extends PickType(ProductCategoryResponse, [
    'id',
    'parentId',
    'name',
    'image',
    'desc',
    'sort',
    'updatedTime',
  ] as const)
  implements IProductCategoryListItem {}
