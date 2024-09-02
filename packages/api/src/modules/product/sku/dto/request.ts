import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString } from 'class-validator'

export class GetProductSkuListRequest {
  @ApiProperty({ description: '商品 ID', example: 1 })
  @IsNumberString({}, { message: '商品 ID 必须为数字' })
  @IsNotEmpty({ message: '商品 ID 不能为空' })
  readonly productId: number
}
