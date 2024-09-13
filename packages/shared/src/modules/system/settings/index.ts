/**
 * 系统设置信息
 */
export interface ISetting {
  /**
   * 设置名
   */
  key: string
  /**
   * 设置值
   */
  value: string
}

/**
 * 系统设置值类型
 */
export type ISettingValueType = boolean | string | number | string[] | number[] | Record<string, any>

/**
 * 系统设置映射
 */
export type ISettingMap = Record<string, any>
