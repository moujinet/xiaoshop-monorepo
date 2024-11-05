import {
  type IDict,
  ProductAttributeOptionType,
} from '@xiaoshop/shared'

/**
 * 商品参数选项类型 - 字典
 *
 * @see {@link ProductAttributeOptionType}
 */
export const PRODUCT_ATTRIBUTE_OPTION_TYPES: IDict[] = [
  { value: '文本', key: ProductAttributeOptionType.TEXT },
  { value: '单选', key: ProductAttributeOptionType.RADIO },
  { value: '多选', key: ProductAttributeOptionType.CHECKBOX },
]
