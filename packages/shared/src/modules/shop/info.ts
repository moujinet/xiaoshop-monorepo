import type { ShopStatus } from './constants'

/**
 * 店铺信息
 */
export interface IShopInfo {
  /**
   * 店铺 ID
   */
  id: string
  /**
   * 店铺状态
   */
  status: ShopStatus
  /**
   * 店铺名称
   */
  name: string
  /**
   * 店铺标志
   */
  logo: string
  /**
   * 网站 ICP 备案号
   */
  icp: string
  /**
   * APP ICP 备案号
   */
  icpApp: string
  /**
   * 微信小程序 ICP 备案号
   */
  icpWechatApp: string
  /**
   * 网安备案号
   */
  wanganNo: string
  /**
   * 增值电信业务经营许可证
   */
  ediNo: string
}
