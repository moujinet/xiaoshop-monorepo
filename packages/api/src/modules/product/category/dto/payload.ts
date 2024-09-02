import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class ProductCategoryPayload {
  @ApiProperty({ description: '父分类 ID' })
  @IsNumber({}, { message: '父分类 ID 必须为数字' })
  @Min(0, { message: '父分类 ID 不能小于 0' })
  readonly parentId: number

  @ApiProperty({ description: '商品分类名称' })
  @IsString({ message: '商品分类名称必须为字符串' })
  @IsNotEmpty({ message: '商品分类名称不能为空' })
  readonly name: string

  @ApiProperty({ required: false, description: '商品分类图片' })
  @IsString({ message: '商品分类图片必须为字符串' })
  @IsOptional()
  readonly image: string

  @ApiProperty({ required: false, description: '商品分类介绍' })
  @IsString({ message: '商品分类介绍必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '排序' })
  @IsNumber({}, { message: '排序必须为数字' })
  @Min(0, { message: '排序不能小于 0' })
  @IsOptional()
  readonly sort: number
}
