import type {
  IProductAddition,
  IProductAdditionDict,
  IProductAdditionListItem,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class ProductAdditionResponse implements IProductAddition {
  @ApiProperty({ description: '附加服务ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '附加服务名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '附加服务图标', example: example.icon })
  readonly icon: string

  @ApiProperty({ description: '附加服务描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '附加服务价格', example: example.price })
  readonly price: number

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间', example: '2021-05-20T08:20:53.000Z' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间', example: '2021-05-20T08:20:53.000Z' })
  readonly updatedTime: string
}

export class ProductAdditionDictResponse
  extends PickType(ProductAdditionResponse, [
    'id',
    'name',
    'icon',
    'price',
  ] as const)
  implements IProductAdditionDict {}

export class ProductAdditionListResponse
  extends PickType(ProductAdditionResponse, [
    'id',
    'name',
    'icon',
    'desc',
    'price',
    'sort',
    'updatedTime',
  ] as const)
  implements IProductAdditionListItem {}
