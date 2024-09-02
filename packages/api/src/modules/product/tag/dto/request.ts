import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '~/common/dto'

export class GetProductTagPagesRequest extends PaginationRequest {}

export class GetProductTagRequest {
  @ApiProperty({ description: '商品标签ID' })
  @IsNumberString({}, { message: '商品标签ID必须为数字' })
  @IsNotEmpty({ message: '商品标签ID不能为空' })
  readonly id: number
}

export class DeleteProductTagRequest {
  @ApiProperty({ description: '商品标签ID' })
  @IsNumber({}, { message: '商品标签ID必须为数字' })
  readonly id: number
}
