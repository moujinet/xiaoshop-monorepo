// -----------------------------------------------
// 素材 - 素材类型
// -----------------------------------------------

/**
 * 枚举: 素材类型
 *
 * - `IMAGE`: 图片
 * - `VIDEO`: 视频
 * - `ICON`: 图标
 */
export enum AssetTypeEnum {
  IMAGE = 'image',
  VIDEO = 'video',
  ICON = 'icon',
}

/**
 * 字典: 素材类型
 *
 * @see {@link IAssetType}
 */
export const ASSET_TYPES = [
  { value: AssetTypeEnum.IMAGE, label: '图片', icon: 'mingcute:pic', accept: 'image/png,image/jpg,image/jpeg,image/gif' },
  { value: AssetTypeEnum.VIDEO, label: '视频', icon: 'mingcute:video', accept: 'video/mp4' },
  { value: AssetTypeEnum.ICON, label: '图标', icon: 'mingcute:add', accept: 'image/png,image/gif' },
]
