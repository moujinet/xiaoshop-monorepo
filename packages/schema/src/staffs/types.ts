import type {
  StaffAccountStatus,
  StaffLogType,
} from '@/staffs/constants'

/**
 * 员工状态
 *
 * - `NORMAL`: 正常
 * - `LOCK`: 锁定
 * - `EXIT`: 离职
 *
 * @see {@link StaffAccountStatus}
 */
export type IStaffAccountStatus = `${StaffAccountStatus}` | StaffAccountStatus

/**
 * 员工日志类型
 *
 * - `SYSTEM`: 系统
 * - `CRONTAB`: 定时
 * - `MANUAL`: 手动
 */
export type IStaffLogType = `${StaffLogType}` | StaffLogType
