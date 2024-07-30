import type { Enabled } from '@/common/constants'

/**
 * 启用状态
 *
 * - `YES`: 启用
 * - `NO`: 停用
 */
export type IEnabled = `${Enabled}` | Enabled
