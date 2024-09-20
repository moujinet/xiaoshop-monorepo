import type { IDict } from '~/common'

import type { IResourceGroupDict } from './group'

/**
 * 素材信息
 */
export interface IResourceInfo {
  /**
   * 素材 ID
   */
  id: number
  /**
   * 素材类型
   *
   * @see {@link ResourceType}
   */
  type: IDict
  /**
   * 素材分组
   */
  group: IResourceGroupDict
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
 * 素材列表
 */
export type IResourceList = Pick<
  IResourceInfo,
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
