import type { ISystemSettingMap } from '@xiaoshop/shared'

import { isJSON, isNumberString } from 'class-validator'

import { SystemSettingEntity } from './entity'

/**
 * 类型化系统设置值
 *
 * @param setting 系统设置
 * @returns 类型化的设置值
 */
export function toSystemSettingTypedValue(setting: SystemSettingEntity) {
  const lastKey = setting.key.split('.').pop()

  // Boolean
  if (lastKey.startsWith('enable'))
    return setting.value === '1'

  if (['yes', 'no', 'true', 'false', 'y', 'n'].includes(setting.value.toLowerCase()))
    return ['yes', 'true', 'y'].includes(setting.value.toLowerCase())

  // JSON
  if (isJSON(setting.value))
    return JSON.parse(setting.value)

  // Number
  if (isNumberString(setting.value))
    return Number(setting.value)

  // String
  return setting.value
}

/**
 * 转换为键值对
 *
 * @returns 系统设置键值对
 */
export function toSystemSettingMap(
  settings: SystemSettingEntity[],
): ISystemSettingMap {
  return settings.reduce((map: ISystemSettingMap, setting) => {
    map[setting.key] = toSystemSettingTypedValue(setting)
    return map
  }, {})
}
