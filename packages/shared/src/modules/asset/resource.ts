import type { IDict } from '~/common'
import type { IAssetGroupDict } from './group'

/**
 * 素材资源信息
 */
export interface IAssetResourceInfo {
  /**
   * 素材 ID
   */
  id: number
  /**
   * 素材类型
   *
   * @see {@link AssetType}
   */
  type: IDict
  /**
   * 素材分组
   */
  group: IAssetGroupDict
  /**
   * 文件名称
   */
  name: string
  /**
   * 文件 MIME 类型
   */
  mimeType: string
  /**
   * 文件路径
   */
  path: string
  /**
   * 文件大小
   */
  size: number
}

/**
 * 素材资源列表
 */
export type IAssetResourceList = Pick<
  IAssetResourceInfo,
  | 'id'
  | 'type'
  | 'name'
  | 'mimeType'
  | 'path'
  | 'size'
> & {
  /**
   * 创建时间
   */
  createdTime: string
}
