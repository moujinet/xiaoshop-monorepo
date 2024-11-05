import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator'

/**
 * Product Attribute Payload
 */
export class ProductAttributePayload {
  @IsString({ message: '参数名称不正确' })
  @IsNotEmpty({ message: '参数名称不能为空' })
  readonly name: string

  @IsString({ each: true, message: '参数值不正确' })
  @ArrayNotEmpty({ message: '参数值不能为空' })
  readonly values: string[]
}
