import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class ProductBrandPayload {
  @ApiProperty({ description: '商品品牌名称' })
  @IsString({ message: '商品品牌名称必须为字符串' })
  @IsNotEmpty({ message: '商品品牌名称不能为空' })
  readonly name: string

  @ApiProperty({ required: false, description: '商品品牌 LOGO' })
  @IsString({ message: '商品品牌 LOGO 必须为字符串' })
  @IsOptional()
  readonly logo: string

  @ApiProperty({ required: false, description: '商品品牌介绍' })
  @IsString({ message: '商品品牌介绍必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '排序' })
  @IsNumber({}, { message: '排序必须为数字' })
  @Min(0, { message: '排序不能小于0' })
  @IsOptional()
  readonly sort: number
}
