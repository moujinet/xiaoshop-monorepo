/**
 * 会员收藏商品信息
 */
export interface IMemberFavoriteInfo {
  /**
   * 收藏 ID
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
   * 收藏时间
   */
  createdTime: string
}
