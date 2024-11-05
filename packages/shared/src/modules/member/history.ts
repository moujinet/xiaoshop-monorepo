/**
 * 会员商品浏览历史信息
 */
export interface IMemberHistoryInfo {
  /**
   * 浏览 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 商品 ID
   */
  productId: number
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品图片
   */
  image: string
  /**
   * 单价
   */
  price: number
  /**
   * 浏览时间
   */
  createdTime: string
}
