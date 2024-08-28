import type {
  AppPlatform,
  AppStatus,
  AppType,
} from './constants'

/**
 * 应用平台
 *
 * - `desktop`: 桌面端
 * - `mobile`: 手机端
 * - `wechat`: 微信端
 *
 * @see {@link AppPlatform}
 */
export type IAppPlatform = `${AppPlatform}`

/**
 * 应用状态
 *
 * - `running`: 运行中
 * - `stoped`: 停止
 *
 * @see {@link AppStatus}
 */
export type IAppStatus = `${AppStatus}`

/**
 * 应用类型
 *
 * - `wechat_mp`: 微信小程序
 * - `wechat_oa`: 微信公众号
 * - `h5`: 手机端
 * - `web`: 网页端
 * - `android`: Android APP
 * - `ios`: iOS APP
 *
 * @see {@link AppType}
 */
export type IAppType = `${AppType}`
