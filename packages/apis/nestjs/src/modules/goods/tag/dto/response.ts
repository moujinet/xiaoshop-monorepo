import type { IGoodsTag, IGoodsTagDict, IGoodsTagListItem } from '@xiaoshop/schema'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { example } from '@/goods/tag/dto/example'

/**
 * 商品标签响应 DTO
 */
export class GoodsTagResponse implements IGoodsTag {
  @ApiProperty({ description: '商品标签 ID' })
  readonly id: number

  @ApiProperty({ description: '标签名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 获取商品标签列表响应 DTO
 */
export class GoodsTagListResponse
  extends OmitType(GoodsTagResponse, ['createdTime'])
  implements IGoodsTagListItem {}

/**
 * 获取商品标签字典响应 DTO
 */
export class GoodsTagDictResponse
  extends PickType(GoodsTagResponse, ['id', 'name'])
  implements IGoodsTagDict {}
