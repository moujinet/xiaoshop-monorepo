import type { IProductExportInfo, IProductExportList } from '@xiaoshop/shared'

import { PRODUCT_EXPORT_STATUSES } from '~/dicts/product/export'
import { objectToDict, pipeDict, toDict } from '~/utils/transformer'

import { ProductExportEntity } from './entity'

/**
 * Transform entities to list
 */
export function toProductExportList(entities: ProductExportEntity[]) {
  return pipeDict<IProductExportList>(entities, [
    row => objectToDict(row, 'status', PRODUCT_EXPORT_STATUSES),
  ])
}

/**
 * Transform entity
 */
export function toProductExportInfo(entity: ProductExportEntity): IProductExportInfo {
  return {
    ...entity,
    status: toDict(entity.status, PRODUCT_EXPORT_STATUSES),
  }
}
