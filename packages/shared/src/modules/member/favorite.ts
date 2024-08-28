/**
 * 会员收藏记录
 */
export interface IMemberFavorite {
  /**
   * 记录 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 商品 ID
   */
  productId: string
  /**
   * 商品名称
   */
  productName: string
  /**
   * 商品价格
   */
  productPrice: number
  /**
   * 收藏时间
   */
  createdTime: string
}
