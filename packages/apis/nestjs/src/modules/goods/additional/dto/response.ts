import type { IGoodsAdditional, IGoodsAdditionalDict, IGoodsAdditionalListItem } from '@xiaoshop/schema'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 商品附加服务 响应 DTO
 */
export class GoodsAdditionalResponse implements IGoodsAdditional {
  @ApiProperty({ description: '商品附加服务 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '商品附加服务名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品附加服务介绍', example: example.desc })
  readonly desc: string

  @ApiProperty({ required: false, description: '商品附加服务图标', example: example.icon })
  readonly icon: string

  @ApiProperty({ description: '服务价格', example: example.price })
  readonly price: number

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 商品附加服务列表 响应 DTO
 */
export class GoodsAdditionalListResponse
  extends OmitType(GoodsAdditionalResponse, ['sort', 'createdTime'])
  implements IGoodsAdditionalListItem {}

/**
 * 商品附加服务字典 响应 DTO
 */
export class GoodsAdditionalDictResponse
  extends PickType(GoodsAdditionalResponse, ['id', 'name', 'price'])
  implements IGoodsAdditionalDict {}
