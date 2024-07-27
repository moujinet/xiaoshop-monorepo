import type { IGoodsProtection, IGoodsProtectionDict, IGoodsProtectionListItem } from '@xiaoshop/schema'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 商品附加服务
 */
export class GoodsProtectionResponse implements IGoodsProtection {
  @ApiProperty({ description: '商品服务 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '商品服务名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品服务介绍', example: example.desc })
  readonly desc: string

  @ApiProperty({ required: false, description: '商品服务图标', example: example.icon })
  readonly icon: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 商品保障服务列表
 */
export class GoodsProtectionListResponse
  extends OmitType(GoodsProtectionResponse, ['sort', 'createdTime'])
  implements IGoodsProtectionListItem {}

/**
 * 商品保障服务字典
 */
export class GoodsProtectionDictResponse
  extends PickType(GoodsProtectionResponse, ['id', 'name', 'icon'])
  implements IGoodsProtectionDict {}
