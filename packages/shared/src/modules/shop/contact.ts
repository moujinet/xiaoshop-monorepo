import type { ILocationPath } from '~/common'

/**
 * 店铺联系方式
 */
export interface IShopContactInfo {
  /**
   * 编号
   */
  id: number
  /**
   * 门面图
   */
  cover: string
  /**
   * 所在城市
   */
  location: ILocationPath
  /**
   * 详细地址
   */
  address: string
  /**
   * 经度
   */
  longitude: string
  /**
   * 纬度
   */
  latitude: string
  /**
   * 联系人
   */
  contact: string
  /**
   * 联系手机
   */
  mobile: string
  /**
   * 联系电话
   */
  tel: string
  /**
   * 电子邮箱
   */
  email: string
  /**
   * QQ 号码
   */
  qq: string
  /**
   * 微信号
   */
  wechat: string
  /**
   * 微博号
   */
  weibo: string
  /**
   * 抖音号
   */
  douyin: string
  /**
   * 排序
   */
  sort: number
}
