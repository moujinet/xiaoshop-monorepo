import type { IAssetType } from '@/assets/types'
import type { IEnabled } from '@/common/types'

/**
 * 素材分组
 */
export interface IAssetGroup {
  /**
   * 素材分组编号
   */
  id: number
  /**
   * 父级分组编号
   */
  parentId: IAssetGroup['id']
  /**
   * 素材分组类型
   *
   * @see {@link IAssetType}
   */
  type: IAssetType
  /**
   * 素材分组名称
   */
  name: string
  /**
   * 是否启用压缩 (N:否 Y:是)
   */
  enableCompress: IEnabled
  /**
   * 是否启用水印 (N:否 Y:是)
   */
  enableWatermark: IEnabled
  /**
   * 是否启用缩略图 (N:否 Y:是)
   */
  enableThumbnail: IEnabled
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 素材分组信息
 */
export type IAssetGroupInfo = Omit<
  IAssetGroup,
  'parentId' | 'type' | 'createdTime'
>

/**
 * 素材分组树
 */
export interface IAssetGroupTreeItem extends IAssetGroup {
  children: IAssetGroupTreeItem[]
}

/**
 * 素材分组根节点
 */
export type IAssetGroupRootItem = Pick<IAssetGroup, 'id' | 'name'>
