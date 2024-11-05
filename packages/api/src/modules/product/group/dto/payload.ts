import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

/**
 * Create Product Group
 */
export class CreateProductGroupPayload {
  @IsString({ message: '商品分组名称不正确' })
  @IsNotEmpty({ message: '商品分组名称不能为空' })
  readonly name: string

  @IsString({ message: '商品分组描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsNumber({}, { message: '商品分组排序不正确' })
  @IsOptional()
  readonly sort?: number
}

/**
 * Update Product Group
 */
export class UpdateProductGroupPayload extends CreateProductGroupPayload {
}
