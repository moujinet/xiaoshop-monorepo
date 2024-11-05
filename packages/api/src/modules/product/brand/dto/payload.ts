import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

/**
 * Create Product Brand
 */
export class CreateProductBrandPayload {
  @IsString({ message: '商品品牌名称不正确' })
  @IsNotEmpty({ message: '商品品牌名称不能为空' })
  readonly name: string

  @IsString({ message: '商品品牌 LOGO 不正确' })
  @IsOptional()
  readonly logo?: string

  @IsString({ message: '商品品牌介绍不正确' })
  @IsOptional()
  readonly desc?: string

  @IsNumber({}, { message: '商品品牌排序不正确' })
  @IsOptional()
  readonly sort?: number
}

/**
 * Update Product Brand
 */
export class UpdateProductBrandPayload extends CreateProductBrandPayload {}
