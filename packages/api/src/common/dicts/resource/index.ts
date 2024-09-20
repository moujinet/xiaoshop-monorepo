import { IDict, ResourceType } from '@xiaoshop/shared'

/**
 * 素材类型 - 字典
 *
 * @see {@link ResourceType}
 */
export const RESOURCE_TYPES: IDict[] = [
  { key: ResourceType.IMAGE, value: '图片', icon: 'mingcute:pic' },
  { key: ResourceType.VIDEO, value: '视频', icon: 'mingcute:video' },
]
