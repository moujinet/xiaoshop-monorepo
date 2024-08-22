import type { IResourceGroupInfo } from './group'
import type { IResourceType } from './types'

/**
 * 素材信息
 */
export interface IResource {
  /**
   * 素材 ID
   */
  id: number
  /**
   * 素材类型
   *
   * - `image`: 图片
   * - `video`: 视频
   *
   * @see {@link IResourceType}
   */
  type: IResourceType
  /**
   * 素材分组 ID
   */
  groupId: number
  /**
   * 素材分组
   *
   * @see {@link IResourceGroupInfo}
   */
  group: IResourceGroupInfo
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
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 素材列表
 */
export type IResourceListItem = Pick<
  IResource,
  | 'id'
  | 'type'
  | 'groupId'
  | 'name'
  | 'mimeType'
  | 'path'
  | 'size'
  | 'createdTime'
>
