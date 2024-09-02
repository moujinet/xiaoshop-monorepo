import type {
  IProductCommitment,
  IProductCommitmentDict,
  IProductCommitmentListItem,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class ProductCommitmentResponse implements IProductCommitment {
  @ApiProperty({ description: '服务承诺ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '服务承诺名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '服务承诺图标', example: example.icon })
  readonly icon: string

  @ApiProperty({ description: '服务承诺描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '创建时间', example: '2021-05-20T08:20:53.000Z' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间', example: '2021-05-20T08:20:53.000Z' })
  readonly updatedTime: string
}

export class ProductCommitmentDictResponse
  extends PickType(ProductCommitmentResponse, [
    'id',
    'name',
    'icon',
  ])
  implements IProductCommitmentDict {}

export class ProductCommitmentListResponse
  extends PickType(ProductCommitmentResponse, [
    'id',
    'name',
    'icon',
    'desc',
    'sort',
    'updatedTime',
  ])
  implements IProductCommitmentListItem {}
