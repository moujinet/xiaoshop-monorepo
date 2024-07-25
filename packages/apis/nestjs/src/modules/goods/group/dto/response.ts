import type { IGoodsGroup, IGoodsGroupDict, IGoodsGroupListItem } from '@xiaoshop/schema'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { example } from '@/goods/group/dto/example'

/**
 * 商品分组响应 DTO
 */
export class GoodsGroupResponse implements IGoodsGroup {
  @ApiProperty({ description: '商品分组 ID' })
  readonly id: number

  @ApiProperty({ description: '分组名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 获取商品分组列表响应 DTO
 */
export class GoodsGroupListResponse
  extends OmitType(GoodsGroupResponse, ['sort', 'createdTime'])
  implements IGoodsGroupListItem {}

/**
 * 获取商品分组字典响应 DTO
 */
export class GoodsGroupDictResponse
  extends PickType(GoodsGroupResponse, ['id', 'name'])
  implements IGoodsGroupDict {}
