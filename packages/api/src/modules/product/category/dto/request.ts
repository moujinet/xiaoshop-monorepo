import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetProductCategoryListRequest {
  @ApiProperty({ required: false, description: '父级分类 ID', example: 1 })
  @IsNumberString({}, { message: '父级分类 ID 必须为数字' })
  @Min(0, { message: '父分类 ID 不能小于 0' })
  @IsOptional()
  readonly parentId: number
}

export class GetProductCategoryRequest {
  @ApiProperty({ description: '商品分类 ID', example: 1 })
  @IsNumberString({}, { message: '商品分类 ID 必须为数字' })
  @IsNotEmpty({ message: '商品分类 ID 不能为空' })
  readonly id: number
}

export class DeleteProductCategoryRequest {
  @ApiProperty({ description: '商品分类 ID', example: 1 })
  @IsNumber({}, { message: '商品分类 ID 必须为数字' })
  readonly id: number
}
