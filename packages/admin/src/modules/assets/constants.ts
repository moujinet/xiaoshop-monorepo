/**
 * 素材类型
 */
export const ASSET_TYPE_IMAGE = 'image'
export const ASSET_TYPE_VIDEO = 'video'
export const ASSET_TYPE_ICON = 'icon'

export const ASSET_TYPES = [
  { value: ASSET_TYPE_IMAGE, label: '图片', icon: 'ph:image-bold' },
  { value: ASSET_TYPE_VIDEO, label: '视频', icon: 'ph:video-bold' },
  { value: ASSET_TYPE_ICON, label: '图标', icon: 'ph:plus-bold' },
]

/**
 * 素材上传文件类型
 */
export const ASSET_ACCEPT_IMAGE = 'image/png,image/jpg,image/jpeg'
export const ASSET_ACCEPT_VIDEO = 'video/mp4'
export const ASSET_ACCEPT_ICON = 'image/png,image/svg+xml'

export const ASSET_ACCEPTS = {
  [ASSET_TYPE_IMAGE]: ASSET_ACCEPT_IMAGE,
  [ASSET_TYPE_VIDEO]: ASSET_ACCEPT_VIDEO,
  [ASSET_TYPE_ICON]: ASSET_ACCEPT_ICON,
}
