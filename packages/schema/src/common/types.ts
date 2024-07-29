import type { Enabled } from '@/common/constants'

/**
 * 启用状态
 *
 * - `YES`: 启用
 * - `NO`: 停用
 */
export type IEnabled = `${Enabled}` | Enabled

/**
 * 地区字典
 */
export interface IArea {
  code: string
  name: string
}

/**
 * 嵌套地区字典
 */
export interface IAreaNested extends IArea {
  children?: IAreaNested[]
}
