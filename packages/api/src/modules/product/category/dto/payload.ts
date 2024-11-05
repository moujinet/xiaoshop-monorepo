import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

/**
 * Create Product Category
 */
export class CreateProductCategoryPayload {
  @IsNumber({}, { message: '商品分类 ID 不正确' })
  @IsOptional()
  readonly parentId?: number

  @IsString({ message: '商品分类名称不正确' })
  @IsNotEmpty({ message: '商品分类名称不能为空' })
  readonly name: string

  @IsString({ message: '商品分类描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsString({ message: '商品分类图片不正确' })
  @IsOptional()
  readonly image?: string

  @IsNumber({}, { message: '商品分类排序不正确' })
  @IsOptional()
  readonly sort?: number
}

/**
 * Update Product Category
 */
export class UpdateProductCategoryPayload extends CreateProductCategoryPayload {
}
