import type { IAssetType } from '@/assets/types'

export interface IAssetGroup {
  id: number
  parentId: IAssetGroup['id']
  type: IAssetType
  name: string
  enableCompress: number
  enableWatermark: number
  enableThumbnail: number
  createdTime: number
}

export interface IAssetGroupTreeNode extends IAssetGroup {
  children: IAssetGroupTreeNode[]
}
