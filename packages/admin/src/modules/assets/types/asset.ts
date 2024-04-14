import type { IAssetGroup } from './group'
import type { ASSET_TYPE_ICON, ASSET_TYPE_IMAGE, ASSET_TYPE_VIDEO } from '~/constants'

export type IAssetType = typeof ASSET_TYPE_IMAGE | typeof ASSET_TYPE_VIDEO | typeof ASSET_TYPE_ICON

export interface IAsset {
  id: number
  groupId: IAssetGroup['id']
  type: IAssetType
  name: string
  path: string
  size: number
  enableCompress: number
  enableWatermark: number
  enableThumbnail: number
  createdTime: number
}

export type IAssetSnapshot = Pick<IAsset, 'id' | 'type' | 'path'>
