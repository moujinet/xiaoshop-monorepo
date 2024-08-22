// -----------------------------------------------
// 素材 - 素材类型
// -----------------------------------------------

/**
 * 素材类型 - 枚举
 *
 * - `IMAGE`: 图片
 * - `VIDEO`: 视频
 *
 * @see {@link IResourceType}
 */
export enum ResourceType {
  IMAGE = 'image',
  VIDEO = 'video',
}

/**
 * 素材类型 - 字典
 *
 * @see {@link IResourceType}
 */
export const RESOURCE_TYPES = [
  { value: ResourceType.IMAGE, label: '图片', icon: 'mingcute:pic', accept: 'image/png,image/jpg,image/jpeg,image/gif' },
  { value: ResourceType.VIDEO, label: '视频', icon: 'mingcute:video', accept: 'video/mp4' },
]
