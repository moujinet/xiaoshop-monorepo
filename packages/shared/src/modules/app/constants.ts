// --------------------------------
// 应用 - 应用平台
// --------------------------------

/**
 * 应用平台 - 枚举
 *
 * - `DESKTOP`: 桌面端
 * - `MOBILE`: 手机端
 * - `WECHAT`: 微信端
 *
 * @see {@link IAppPlatform}
 */
export enum AppPlatform {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  WECHAT = 'wechat',
}

/**
 * 应用平台 - 字典
 *
 * @see {@link IAppPlatform}
 */
export const APP_PLATFORMS = [
  { label: '桌面端', value: AppPlatform.DESKTOP, color: 'arcoblue' },
  { label: '手机端', value: AppPlatform.MOBILE, color: 'purple' },
  { label: '微信端', value: AppPlatform.WECHAT, color: 'green' },
]

// --------------------------------
// 应用 - 应用状态
// --------------------------------

/**
 * 应用状态 - 枚举
 *
 * - `RUNNING`: 运行中
 * - `STOPED`: 停止
 *
 * @see {@link IAppStatus}
 */
export enum AppStatus {
  RUNNING = 'running',
  STOPED = 'stoped',
}

/**
 * 应用状态 - 字典
 *
 * @see {@link IAppStatus}
 */
export const APP_STATUSES = [
  { label: '运行中', value: AppStatus.RUNNING, color: 'green' },
  { label: '停止', value: AppStatus.STOPED, color: 'red' },
]

// --------------------------------
// 应用 - 应用类型
// --------------------------------

/**
 * 应用类型 - 枚举
 *
 * - `WECHAT_MP`: 微信小程序
 * - `WECHAT_OA`: 微信公众号
 * - `H5`: 手机端
 * - `WEB`: 网页端
 * - `APP_ANDROID`: Android APP
 * - `APP_IOS`: iOS APP
 *
 * @see {@link IAppType}
 */
export enum AppType {
  WECHAT_MP = 'wechat_mp',
  WECHAT_OA = 'wechat_oa',
  H5 = 'h5',
  WEB = 'web',
  APP_ANDROID = 'android',
  APP_IOS = 'ios',
}

/**
 * 应用类型 - 字典
 *
 * @see {@link IAppType}
 */
export const APP_TYPES = [
  { label: '微信小程序', value: AppType.WECHAT_MP, color: 'gray', platform: AppPlatform.WECHAT, icon: 'mingcute:wechat-miniprogram' },
  { label: '微信公众号', value: AppType.WECHAT_OA, color: 'green', platform: AppPlatform.WECHAT, icon: 'mingcute:wechat' },
  { label: '手机端', value: AppType.H5, color: 'blue', platform: AppPlatform.MOBILE, icon: 'mingcute:cellphone' },
  { label: '网页端', value: AppType.WEB, color: 'blue', platform: AppPlatform.DESKTOP, icon: 'mingcute:laptop' },
  { label: 'iOS APP', value: AppType.APP_IOS, color: 'gray', platform: AppPlatform.MOBILE, icon: 'mingcute:apple' },
  { label: 'Android APP', value: AppType.APP_ANDROID, color: 'cyan', platform: AppPlatform.MOBILE, icon: 'mingcute:android-2' },
]
