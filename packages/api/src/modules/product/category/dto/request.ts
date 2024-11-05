import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator'

/**
 * Query Product Category List
 */
export class GetProductCategoryListRequest {
  @IsNumberString({}, { message: '商品父分类 ID 不正确' })
  @IsOptional()
  readonly parentId?: number
}

/**
 * Get Product Category
 */
export class GetProductCategoryRequest {
  @IsNumberString({}, { message: '商品分类 ID 不正确' })
  @IsNotEmpty({ message: '商品分类 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Product Category
 */
export class DeleteProductCategoryRequest {
  @IsNumber({}, { message: '商品分类 ID 不正确' })
  readonly id: number
}
