import type { IAssetGroup } from './group'

export type IAssetType = 'image' | 'video'

export interface IAsset {
  id: number
  groupId: IAssetGroup['id']
  type: IAssetType
  name: string
  path: string
  size: number
  createdTime: number
}

export type IAssetImagePreview = Pick<IAsset, 'id' | 'path'>
