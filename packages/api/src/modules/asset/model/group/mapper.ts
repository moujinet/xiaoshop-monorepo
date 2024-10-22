import type { IAssetGroupInfo, IAssetGroupNestedList } from '@xiaoshop/shared'

import { ASSET_TYPES } from '~/dicts/asset'
import { objectToDict, toNestedList } from '~/utils/transformer'

import { AssetGroupEntity } from './entity'

/**
 * Transform entities to nested list
 */
export function toAssetGroupNestedList(groups: AssetGroupEntity[]) {
  return toNestedList<IAssetGroupNestedList>(groups)
}

/**
 * Transform entity
 */
export function toAssetGroupInfo(group: AssetGroupEntity) {
  return objectToDict(group, 'type', ASSET_TYPES) as IAssetGroupInfo
}
