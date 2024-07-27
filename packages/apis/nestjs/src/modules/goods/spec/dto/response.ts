import { Enabled, type IEnabled, type IGoodsSpec, type IGoodsSpecValue } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { nanoid } from '~/utils'

/**
 * 商品规格响应 DTO
 */
export class GoodsSpecResponse implements IGoodsSpec {
  @ApiProperty({ description: '规格 ID', example: nanoid() })
  readonly id: string

  @ApiProperty({ description: '规格名', example: example.name })
  readonly name: string

  @ApiProperty({ description: '规格值', example: example.values })
  readonly values: IGoodsSpecValue[]

  @ApiProperty({ enum: Enabled, description: '启用图片', example: example.enableImage })
  readonly enableImage: IEnabled
}
