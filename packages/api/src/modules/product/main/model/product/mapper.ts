import type { IProductInfo, IProductList, IProductOverview } from '@xiaoshop/shared'

import { pick } from 'es-toolkit/compat'

import { objectToDict, pipeDict, toDict } from '~/utils/transformer'
import { PRODUCT_SOURCES, PRODUCT_STATUSES, PRODUCT_TYPES } from '~/dicts/product'

import { ProductEntity } from './entity'

/**
 * Transform entity to Product Info
 */
export function toProductInfo(entity: ProductEntity): IProductInfo {
  return {
    ...entity,
    status: toDict(entity.status, PRODUCT_STATUSES),
    source: toDict(entity.source, PRODUCT_SOURCES),
    type: toDict(entity.type, PRODUCT_TYPES),
  }
}

/**
 * Transform entity to Product Overview
 */
export function toProductOverview(entity: ProductEntity): IProductOverview {
  return {
    ...pick(entity, ['id', 'connectId', 'name', 'desc', 'slogan', 'tags']),
    image: entity.images.shift(),
  }
}

/**
 * Transform entities to list
 */
export function toProductList(entities: ProductEntity[]) {
  return pipeDict<IProductList>(entities, [
    row => objectToDict(row, 'status', PRODUCT_STATUSES),
    row => objectToDict(row, 'source', PRODUCT_SOURCES),
    row => objectToDict(row, 'type', PRODUCT_TYPES),
  ])
}
