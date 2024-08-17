import type { IGoods } from '@/goods'
import type { IMemberSource } from '@/member/types'

/**
 * 会员商品浏览记录
 */
export interface IMemberHistoryLog {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 浏览来源
   *
   * @see {@link IMemberSource}
   */
  source: IMemberSource
  /**
   * 商品 ID
   *
   * @see {@link IGoods}
   */
  goodsId: IGoods['id']
  /**
   * 商品名称
   */
  goodsName: string
  /**
   * 商品价格
   */
  goodsPrice: number
  /**
   * 浏览商品
   *
   * @virtual
   */
  goods: IGoods
  /**
   * 浏览时间
   */
  createdTime: string
}
