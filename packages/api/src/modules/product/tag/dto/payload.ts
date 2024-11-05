import type { IColorName } from '@xiaoshop/shared'

import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

/**
 * Create Product Tag
 */
export class CreateProductTagPayload {
  @IsString({ message: '标签名称不正确' })
  @IsNotEmpty({ message: '标签名称不能为空' })
  readonly name: string

  @IsString({ message: '标签颜色不正确' })
  @IsOptional()
  readonly color?: IColorName
}

/**
 * Update Product Tag
 */
export class UpdateProductTagPayload extends CreateProductTagPayload {}
