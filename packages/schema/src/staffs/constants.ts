// -----------------------------------------------
// 员工 - 状态
// -----------------------------------------------

/**
 * 枚举: 员工状态
 *
 * - `NORMAL`: 正常
 * - `LOCK`: 锁定
 * - `EXIT`: 离职
 */
export enum StaffAccountStatus {
  NORMAL = 'normal',
  LOCK = 'lock',
  EXIT = 'exit',
}

/**
 * 字典: 员工状态
 *
 * @see {@link IStaffAccountStatus}
 */
export const STAFF_ACCOUNT_STATUSES = [
  { label: '正常', value: StaffAccountStatus.NORMAL, color: 'blue' },
  { label: '锁定', value: StaffAccountStatus.LOCK, color: 'orange' },
  { label: '离职', value: StaffAccountStatus.EXIT, color: 'red' },
]

// -----------------------------------------------
// 员工 - 员工日志 - 类型
// -----------------------------------------------

/**
 * 枚举: 员工日志 - 类型
 *
 * - `LOGIN`: 登录登出
 * - `OPERATE`: 操作日志
 */
export enum StaffLogType {
  LOGIN = 'login',
  OPERATE = 'operate',
}

/**
 * 字典: 员工日志 - 类型
 *
 * @see {@link IStaffLogType}
 */
export const STAFF_LOG_TYPES = [
  { label: '登录日志', value: StaffLogType.LOGIN, color: 'orange' },
  { label: '操作日志', value: StaffLogType.OPERATE, color: 'arcoblue' },
]
