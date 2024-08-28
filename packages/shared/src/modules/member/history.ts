/**
 * 会员访问记录
 */
export interface IMemberHistory {
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
   * 访问时间
   */
  createdTime: string
}
