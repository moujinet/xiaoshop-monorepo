import type { IProductCategoryNestedDict } from '@xiaoshop/shared'

import { toNestedList } from '~/utils/transformer'

import { ProductCategoryEntity } from './entity'

/**
 * Transform product category entity to product category nested dict
 */
export function toProductCategoryNestedDict(entities: ProductCategoryEntity[]) {
  return toNestedList<IProductCategoryNestedDict>(entities)
}
