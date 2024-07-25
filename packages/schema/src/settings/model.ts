/**
 * 系统设置信息
 */
export interface ISettings {
  /**
   * 设置 ID
   */
  id: number
  /**
   * 设置键
   */
  key: string
  /**
   * 设置值
   */
  value: string
}

/**
 * 字典: 设置
 */
export type ISettingsDict = Record<ISettings['key'], ISettings['value']>

/**
 * 设置信息
 */
export type ISettingsOption = Pick<ISettings, 'key' | 'value'>
