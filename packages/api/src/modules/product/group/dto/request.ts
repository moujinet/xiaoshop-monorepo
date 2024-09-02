import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '~/common/dto'

export class GetProductGroupPagesRequest extends PaginationRequest {}

export class GetProductGroupRequest {
  @ApiProperty({ description: '商品分组ID' })
  @IsNumberString({}, { message: '商品分组ID必须为数字' })
  @IsNotEmpty({ message: '商品分组ID不能为空' })
  readonly id: number
}

export class DeleteProductGroupRequest {
  @ApiProperty({ description: '商品分组ID' })
  @IsNumber({}, { message: '商品分组ID必须为数字' })
  readonly id: number
}
