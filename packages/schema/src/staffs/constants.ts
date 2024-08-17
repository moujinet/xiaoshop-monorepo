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
// 员工日志 - 动作类型
// -----------------------------------------------

/**
 * 枚举: 员工日志类型
 *
 * - `SYSTEM`: 系统
 * - `CRONTAB`: 定时
 * - `MANUAL`: 手动
 */
export enum StaffLogType {
  SYSTEM = 'system',
  CRONTAB = 'crontab',
  MANUAL = 'manual',
}

/**
 * 字典: 员工日志类型
 *
 * @see {@link IStaffLogType}
 */
export const STAFF_LOG_TYPES = [
  { label: '系统', value: StaffLogType.SYSTEM, color: 'purple' },
  { label: '定时', value: StaffLogType.CRONTAB, color: 'orange' },
  { label: '手动', value: StaffLogType.MANUAL, color: 'arcoblue' },
]
