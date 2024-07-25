export interface IOrderDeliveryBatch {
  /**
   * 批次编号
   */
  id: number
  /**
   * 批次创建人
   */
  staffId: number
  /**
   * 订单总数
   */
  total: number
  /**
   * 成功数
   */
  success: number
  /**
   * 失败数
   */
  failed: number
  /**
   * 创建时间
   */
  createdTime: number
}
