export interface IAssetGroup {
  id: number
  parentId: IAssetGroup['id']
  name: string
  createdTime: number
}

export interface IAssetGroupTreeNode extends IAssetGroup {
  children: IAssetGroupTreeNode[]
}
