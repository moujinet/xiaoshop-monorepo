import type { ISettingsDict } from '@xiaoshop/schema'

export type ISettingsValue = boolean | string | number | string[] | Record<string, any>

export interface ISettingsTyped {
  [x: string]: ISettingsValue
}

export interface ISettingsModuleOptions {
  /**
   * 设置项键名前缀
   */
  keyPrefix?: string
  /**
   * 默认设置项
   */
  defaultSettings?: ISettingsDict
}
