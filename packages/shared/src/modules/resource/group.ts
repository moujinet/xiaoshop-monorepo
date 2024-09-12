import type { YesOrNo } from '~/common'
import type { ResourceType } from './constants'

/**
 * 素材分组
 */
export interface IResourceGroup {
  /**
   * 分组 ID
   */
  id: number
  /**
   * 上级分组 ID
   */
  parentId: number
  /**
   * 分组类型
   *
   * @see {@link ResourceType}
   */
  type: ResourceType
  /**
   * 分组名称
   */
  name: string
  /**
   * 是否启用压缩 (N:否 Y:是)
   *
   * @see {@link YesOrNo}
   */
  enableCompress: YesOrNo
  /**
   * 是否启用水印 (N:否 Y:是)
   *
   * @see {@link YesOrNo}
   */
  enableWatermark: YesOrNo
  /**
   * s
   * 是否启用缩略图 (N:否 Y:是)
   *
   * @see {@link YesOrNo}
   */
  enableThumbnail: YesOrNo
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 素材分组 - 信息
 */
export type IResourceGroupInfo = Pick<
  IResourceGroup,
  | 'name'
  | 'enableCompress'
  | 'enableWatermark'
  | 'enableThumbnail'
>

/**
 * 素材分组 - 树形结构
 */
export interface IResourceGroupTreeItem extends IResourceGroup {
  children?: IResourceGroupTreeItem[]
}

/**
 * 素材分组 - 字典
 */
export type IResourceGroupDict = Pick<
  IResourceGroup,
  | 'id'
  | 'name'
>
