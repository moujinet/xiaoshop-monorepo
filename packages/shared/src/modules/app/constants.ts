import { ColorName } from '~/common'

// --------------------------------
// 应用 - 应用平台
// --------------------------------

/**
 * 应用平台 - 枚举
 *
 * - `DESKTOP`: 桌面端
 * - `MOBILE`: 手机端
 * - `WECHAT`: 微信端
 */
export enum AppPlatform {
  DESKTOP,
  MOBILE,
  WECHAT,
}

/**
 * 应用平台 - 字典
 *
 * @see {@link AppPlatform}
 */
export const APP_PLATFORMS = [
  { label: '桌面端', value: AppPlatform.DESKTOP, color: ColorName.ARCOBLUE },
  { label: '手机端', value: AppPlatform.MOBILE, color: ColorName.PURPLE },
  { label: '微信端', value: AppPlatform.WECHAT, color: ColorName.GREEN },
]

// --------------------------------
// 应用 - 应用状态
// --------------------------------

/**
 * 应用状态 - 枚举
 *
 * - `STOPED`: 已停止
 * - `RUNNING`: 运行中
 */
export enum AppStatus {
  STOPED,
  RUNNING,
}

/**
 * 应用状态 - 字典
 *
 * @see {@link AppStatus}
 */
export const APP_STATUSES = [
  { label: '运行中', value: AppStatus.RUNNING, color: ColorName.GREEN },
  { label: '已停止', value: AppStatus.STOPED, color: ColorName.RED },
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
 * - `APP_IOS`: iOS APP
 * - `APP_ANDROID`: Android APP
 * - `WEB`: 网页端
 */
export enum AppType {
  WECHAT_MP = 1,
  WECHAT_OA,
  H5,
  APP_IOS,
  APP_ANDROID,
  WEB,
}

/**
 * 应用类型 - 字典
 *
 * @see {@link AppType}
 */
export const APP_TYPES = [
  { label: '微信小程序', value: AppType.WECHAT_MP, color: ColorName.GRAY, platform: AppPlatform.WECHAT, icon: 'mingcute:wechat-miniprogram' },
  { label: '微信公众号', value: AppType.WECHAT_OA, color: ColorName.GREEN, platform: AppPlatform.WECHAT, icon: 'mingcute:wechat' },
  { label: '手机端', value: AppType.H5, color: ColorName.ARCOBLUE, platform: AppPlatform.MOBILE, icon: 'mingcute:cellphone' },
  { label: '网页端', value: AppType.WEB, color: ColorName.ARCOBLUE, platform: AppPlatform.DESKTOP, icon: 'mingcute:laptop' },
  { label: 'iOS APP', value: AppType.APP_IOS, color: ColorName.GRAY, platform: AppPlatform.MOBILE, icon: 'mingcute:apple' },
  { label: 'Android APP', value: AppType.APP_ANDROID, color: ColorName.CYAN, platform: AppPlatform.MOBILE, icon: 'mingcute:android-2' },
]
