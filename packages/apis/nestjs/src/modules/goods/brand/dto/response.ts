import type { IGoodsBrand, IGoodsBrandDict, IGoodsBrandListItem } from '@xiaoshop/schema'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 商品品牌响应 DTO
 */
export class GoodsBrandResponse implements IGoodsBrand {
  @ApiProperty({ description: '商品品牌 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '商品品牌名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品品牌介绍', example: example.desc })
  readonly desc: string

  @ApiProperty({ required: false, description: '商品品牌 LOGO', example: example.logo })
  readonly logo: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 获取商品品牌列表响应 DTO
 */
export class GoodsBrandListResponse
  extends OmitType(GoodsBrandResponse, ['sort', 'createdTime'])
  implements IGoodsBrandListItem {}

/**
 * 获取商品品牌字典响应 DTO
 */
export class GoodsBrandDictResponse
  extends PickType(GoodsBrandResponse, ['id', 'name'])
  implements IGoodsBrandDict {}
