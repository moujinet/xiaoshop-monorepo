import type { IResourceType } from './types'
import type { IYesOrNo } from '~/common'

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
   * - `image`: 图片
   * - `video`: 视频
   *
   * @see {@link IResourceType}
   */
  type: IResourceType
  /**
   * 分组名称
   */
  name: string
  /**
   * 是否启用压缩 (N:否 Y:是)
   *
   * @see {@link IYesOrNo}
   */
  enableCompress: IYesOrNo
  /**
   * 是否启用水印 (N:否 Y:是)
   *
   * @see {@link IYesOrNo}
   */
  enableWatermark: IYesOrNo
  /**
   * s
   * 是否启用缩略图 (N:否 Y:是)
   *
   * @see {@link IYesOrNo}
   */
  enableThumbnail: IYesOrNo
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
