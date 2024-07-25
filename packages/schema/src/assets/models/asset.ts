import type { IAssetType } from '@/assets/types'
import type { IAssetGroupInfo } from '@/assets/models/group'

/**
 * 素材信息
 */
export interface IAsset {
  /**
   * 素材编号
   */
  id: number
  /**
   * 素材类型
   *
   * @see {@link IAssetType}
   */
  type: IAssetType
  /**
   * 素材分组
   *
   * @see {@link IAssetGroupInfo}
   */
  group: IAssetGroupInfo
  /**
   * 文件名称
   */
  name: string
  /**
   * 文件路径
   */
  path: string
  /**
   * 文件大小
   */
  size: number
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 字典 - 素材信息
 */
export type IAssetInfo = Pick<
  IAsset,
  'id' | 'type' | 'path'
>

/**
 * 素材分页项
 */
export type IAssetListItem = Omit<IAsset, 'group'>

/**
 * 素材上传选项信息
 */
export type IAssetUploadOptions = Pick<IAsset, 'type'>
  & Partial<
    Pick<IAssetGroupInfo, 'enableCompress' | 'enableThumbnail' | 'enableWatermark'>
  >
  & {
    /**
     * 素材分组 ID
     */
    groupId: string
  }
