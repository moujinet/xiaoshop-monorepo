import type { ProductServiceType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

/**
 * Create Product Extra Service
 */
export class CreateProductExtraServicePayload {
  @IsNumber({}, { message: '服务类型不正确' })
  @IsOptional()
  readonly type?: ProductServiceType

  @IsString({ message: '服务名称不正确' })
  @IsNotEmpty({ message: '服务名称不能为空' })
  readonly name: string

  @IsString({ message: '服务图标不正确' })
  @IsOptional()
  readonly icon?: string

  @IsString({ message: '服务描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number
}

/**
 * Update Product Extra Service
 */
export class UpdateProductExtraServicePayload extends CreateProductExtraServicePayload {
}

/**
 * Create Product Addition Service
 */
export class CreateProductAdditionServicePayload extends CreateProductExtraServicePayload {
  @IsNumber({}, { message: '服务价格不正确' })
  readonly price: number
}

/**
 * Update Product Addition Service
 */
export class UpdateProductAdditionServicePayload extends CreateProductAdditionServicePayload {
}
