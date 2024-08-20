import type {
  AuthLogType,
  AuthUserStatus,
} from './constants'

/**
 * 员工 - 状态
 *
 * - `normal`: 正常
 * - `locked`: 锁定
 * - `quitted`: 离职
 *
 * @see {@link AuthUserStatus}
 */
export type IAuthUserStatus = `${AuthUserStatus}`

/**
 * 日志 - 类型
 *
 * - `user`: 用户
 * - `system`: 系统
 *
 * @see {@link AuthLogType}
 */
export type IAuthLogType = `${AuthLogType}`
