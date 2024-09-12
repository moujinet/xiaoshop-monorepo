import type { IAppComponent } from './component'
import type { IAppObject } from './object'

/**
 * 应用
 */
export interface IApp extends IAppObject {
  /**
   * 应用 ID
   */
  id: string
  /**
   * 应用组件
   */
  components?: IAppComponent[]
}
