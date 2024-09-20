import type { IDict, YesOrNo } from '~/common'

/**
 * 素材分组信息
 */
export interface IResourceGroupInfo {
/**
 * 分组 ID
 */
  id: number
  /**
   * 分组类型
   *
   * @see {@link ResourceType}
   */
  type: IDict
  /**
   * 上级分组 ID
   */
  parentId: number
  /**
   * 分组名称
   */
  name: string
  /**
   * 排序
   */
  sort: number
  /**
   * 是否启用压缩
   */
  enableCompress: YesOrNo
  /**
   * 是否启用水印
   */
  enableWatermark: YesOrNo
  /**
   * 是否启用缩略图
   */
  enableThumbnail: YesOrNo
}

/**
 * 素材分组字典
 */
export type IResourceGroupDict = Pick<
  IResourceGroupInfo,
  | 'id'
  | 'name'
  | 'enableCompress'
  | 'enableThumbnail'
  | 'enableWatermark'
>

/**
 * 素材分组嵌套字典
 */
export type IResourceGroupNestedList = Pick<
  IResourceGroupInfo,
  | 'id'
  | 'parentId'
  | 'name'
  | 'enableCompress'
  | 'enableThumbnail'
  | 'enableWatermark'
>
& {
  /**
   * 下级分组
   */
  children?: IResourceGroupNestedList
}
