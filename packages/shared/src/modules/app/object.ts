import type { IAppStyle } from './style'

/**
 * 应用对象
 */
export interface IAppObject {
  /**
   * 样式
   */
  style?: Partial<IAppStyle>
  /**
   * 属性
   */
  properties?: Record<string, any>
}
