// --------------------------------
// 权限 - 员工 - 状态
// --------------------------------

/**
 * 枚举: 员工状态
 *
 * - `NORMAL`: 正常
 * - `LOCKED`: 锁定
 * - `QUITTED`: 离职
 *
 * @see {@link IAuthUserStatus}
 */
export enum AuthUserStatus {
  NORMAL = 'normal',
  LOCKED = 'locked',
  BLOCKED = 'blocked',
  QUITTED = 'quitted',
}

/**
 * 字典: 员工状态
 *
 * @see {@link IAuthUserStatus}
 */
export const USER_STATUSES = [
  { label: '正常', value: AuthUserStatus.NORMAL, color: 'blue' },
  { label: '锁定', value: AuthUserStatus.LOCKED, color: 'orange' },
  { label: '禁用', value: AuthUserStatus.BLOCKED, color: 'red' },
  { label: '离职', value: AuthUserStatus.QUITTED, color: 'red' },
]

// --------------------------------
// 权限 - 日志 - 类型
// --------------------------------

/**
 * 枚举: 日志类型
 *
 * - `USER`: 用户
 * - `SYSTEM`: 系统
 *
 * @see {@link IAuthLogType}
 */
export enum AuthLogType {
  USER = 'user',
  SYSTEM = 'system',
}

/**
 * 字典: 日志类型
 *
 * @see {@link IAuthLogType}
 */
export const AUTH_LOG_TYPES = [
  { label: '用户', value: AuthLogType.USER, color: 'arcoblue' },
  { label: '系统', value: AuthLogType.SYSTEM, color: 'purple' },
]
