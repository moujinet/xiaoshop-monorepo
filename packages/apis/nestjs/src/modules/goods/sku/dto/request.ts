import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { nanoid } from '~/utils'

/**
 * 获取商品 SKU 列表请求 DTO
 *
 * @param id 商品 ID
 */
export class GetGoodsSkuByGoodsRequest {
  @ApiProperty({ description: '商品 ID', example: nanoid() })
  @IsString()
  @IsNotEmpty()
  readonly id: string
}
