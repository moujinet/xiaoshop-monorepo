import type { IAssetResourceInfo, IAssetResourceList } from '@xiaoshop/shared'

import { ASSET_TYPES } from '~/dicts/asset'
import { objectToDict, pipeDict } from '~/utils/transformer'

import { AssetResourceEntity } from './entity'

/**
 * Transform entities to list
 */
export function toAssetResourceList(resources: AssetResourceEntity[]) {
  return pipeDict<IAssetResourceList>(resources, [
    row => objectToDict(row, 'type', ASSET_TYPES),
  ])
}

/**
 * Transform entity
 */
export function toAssetResourceInfo(resource: AssetResourceEntity) {
  return objectToDict(resource, 'type', ASSET_TYPES) as IAssetResourceInfo
}
