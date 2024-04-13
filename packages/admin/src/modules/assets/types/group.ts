import type { IAssetType } from '@/assets/types'

export interface IAssetGroup {
  id: number
  parentId: IAssetGroup['id']
  type: IAssetType
  name: string
  createdTime: number
}

export interface IAssetGroupTreeNode extends IAssetGroup {
  children: IAssetGroupTreeNode[]
}
