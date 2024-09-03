import { ColorName } from '~/common'

// --------------------------------
// 权限 - 员工 - 状态
// --------------------------------

/**
 * 枚举: 员工状态
 *
 * - `NORMAL`: 正常
 * - `LOCKED`: 锁定
 * - `BLOCKED`: 禁用
 * - `QUITTED`: 离职
 */
export enum AuthUserStatus {
  NORMAL = 1,
  LOCKED,
  BLOCKED,
  QUITTED,
}

/**
 * 字典: 员工状态
 *
 * @see {@link AuthUserStatus}
 */
export const USER_STATUSES = [
  { label: '正常', value: AuthUserStatus.NORMAL, color: ColorName.ARCOBLUE },
  { label: '锁定', value: AuthUserStatus.LOCKED, color: ColorName.ORANGERED },
  { label: '禁用', value: AuthUserStatus.BLOCKED, color: ColorName.RED },
  { label: '离职', value: AuthUserStatus.QUITTED, color: ColorName.GRAY },
]

// --------------------------------
// 权限 - 日志 - 类型
// --------------------------------

/**
 * 枚举: 日志类型
 *
 * - `USER`: 用户
 * - `SYSTEM`: 系统
 */
export enum AuthLogType {
  USER = 1,
  SYSTEM,
}

/**
 * 字典: 日志类型
 *
 * @see {@link AuthLogType}
 */
export const AUTH_LOG_TYPES = [
  { label: '用户', value: AuthLogType.USER, color: ColorName.ARCOBLUE },
  { label: '系统', value: AuthLogType.SYSTEM, color: ColorName.PURPLE },
]
