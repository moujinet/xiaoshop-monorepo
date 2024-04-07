export type IAssetType = 'image' | 'video' | 'audio'

export interface IAsset {
  id: number
  type: IAssetType
  name: string
  path: string
  size: number
  createdTime: string
}

export type IAssetImagePreview = Pick<IAsset, 'id' | 'path'>

export interface IAssetGroup {
  id: number
  parent: number
  name: string
  createdTime: string
}
