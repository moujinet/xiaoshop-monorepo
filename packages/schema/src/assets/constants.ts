// -----------------------------------------------
// 素材 - 素材类型
// -----------------------------------------------

/**
 * 枚举: 素材类型
 *
 * - `IMAGE`: 图片
 * - `VIDEO`: 视频
 */
export enum AssetType {
  IMAGE = 'image',
  VIDEO = 'video',
}

/**
 * 字典: 素材类型
 *
 * @see {@link IAssetType}
 */
export const ASSET_TYPES = [
  { value: AssetType.IMAGE, label: '图片', icon: 'mingcute:pic', accept: 'image/png,image/jpg,image/jpeg,image/gif' },
  { value: AssetType.VIDEO, label: '视频', icon: 'mingcute:video', accept: 'video/mp4' },
]
