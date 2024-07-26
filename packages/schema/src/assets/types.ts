import type { AssetType } from '@/assets/constants'

/**
 * 素材类型
 *
 * - `IMAGE`: 图片
 * - `VIDEO`: 视频
 *
 * @see {@link AssetType}
 */
export type IAssetType = typeof AssetType[keyof typeof AssetType]
