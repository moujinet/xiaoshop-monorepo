import type {
  StaffAccountStatusEnum,
  StaffLogTypeEnum,
} from '@/staffs/constants'

/**
 * 员工状态
 *
 * - `NORMAL`: 正常
 * - `LOCK`: 锁定
 * - `EXIT`: 离职
 *
 * @see {@link StaffAccountStatusEnum}
 */
export type IStaffAccountStatus = StaffAccountStatusEnum

/**
 * 员工日志 - 类型
 *
 * - `LOGIN`: 登录登出
 * - `OPERATE`: 操作日志
 *
 * @see {@link StaffLogTypeEnum}
 */
export type IStaffLogType = StaffLogTypeEnum
