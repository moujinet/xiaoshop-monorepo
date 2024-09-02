import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '~/common/dto'

export class GetProductBrandPagesRequest extends PaginationRequest {}

export class GetProductBrandRequest {
  @ApiProperty({ description: '商品品牌ID' })
  @IsNumberString({}, { message: '商品品牌ID必须为数字' })
  @IsNotEmpty({ message: '商品品牌ID不能为空' })
  readonly id: number
}

export class DeleteProductBrandRequest {
  @ApiProperty({ description: '商品品牌ID' })
  @IsNumber({}, { message: '商品品牌ID必须为数字' })
  readonly id: number
}
