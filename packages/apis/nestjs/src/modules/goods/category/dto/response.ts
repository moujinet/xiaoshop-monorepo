import type { IGoodsCategory, IGoodsCategoryDict, IGoodsCategoryListItem, IGoodsCategoryNestedDict } from '@xiaoshop/schema'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 商品分类响应 DTO
 */
export class GoodsCategoryResponse implements IGoodsCategory {
  @ApiProperty({ description: '商品分类 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '父分类 ID', example: 0 })
  readonly parentId: number

  @ApiProperty({ description: '商品分类名称', example: example.name })
  readonly name: string

  @ApiProperty({ required: false, description: '商品分类图片', example: example.image })
  readonly image: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 商品分类字典
 */
export class GoodsCategoryDictResponse
  extends PickType(GoodsCategoryResponse, ['id', 'name'])
  implements IGoodsCategoryDict {}

/**
 * 商品层级分类字典
 */
export class GoodsCategoryNestedDictResponse
  extends PickType(GoodsCategoryResponse, ['id', 'parentId', 'name'])
  implements IGoodsCategoryNestedDict {}

/**
 * 商品分类列表
 */
export class GoodsCategoryListResponse
  extends OmitType(GoodsCategoryResponse, ['createdTime'])
  implements IGoodsCategoryListItem {}
