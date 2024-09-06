import type {
  IColorName,
  IProductTag,
  IProductTagDict,
  IProductTagListItem,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class ProductTagResponse implements IProductTag {
  @ApiProperty({ description: '商品标签ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '商品标签名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品标签颜色', example: example.color })
  readonly color: IColorName

  @ApiProperty({ description: '创建时间', example: '2021-05-20T08:20:53.000Z' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间', example: '2021-05-20T08:20:53.000Z' })
  readonly updatedTime: string
}

export class ProductTagDictResponse
  extends PickType(ProductTagResponse, [
    'id',
    'name',
    'color',
  ] as const)
  implements IProductTagDict {}

export class ProductTagListResponse
  extends PickType(ProductTagResponse, [
    'id',
    'name',
    'color',
    'updatedTime',
  ] as const)
  implements IProductTagListItem {}
