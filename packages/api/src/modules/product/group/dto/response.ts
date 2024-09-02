import type {
  IProductGroup,
  IProductGroupDict,
  IProductGroupListItem,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class ProductGroupResponse implements IProductGroup {
  @ApiProperty({ description: '商品分组ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '商品分组名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品分组描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间', example: '2021-05-20T08:20:53.000Z' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间', example: '2021-05-20T08:20:53.000Z' })
  readonly updatedTime: string
}

export class ProductGroupDictResponse
  extends PickType(ProductGroupResponse, [
    'id',
    'name',
  ])
  implements IProductGroupDict {}

export class ProductGroupListResponse
  extends PickType(ProductGroupResponse, [
    'id',
    'name',
    'desc',
    'sort',
    'updatedTime',
  ])
  implements IProductGroupListItem {}
