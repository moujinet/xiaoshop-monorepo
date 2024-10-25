import { AssetType, type IDict } from '@xiaoshop/shared'

/**
 * 素材类型 - 字典
 *
 * @see {@link AssetType}
 */
export const ASSET_TYPES: IDict[] = [
  { key: AssetType.IMAGE, value: '图片', icon: 'mingcute:pic' },
  { key: AssetType.VIDEO, value: '视频', icon: 'mingcute:video' },
]
