import { ColorName, type IDict } from '~/common'

// --------------------------------
// 系统 - 用户 - 状态
// --------------------------------

/**
 * 枚举: 系统用户状态
 *
 * - `NORMAL`: 正常
 * - `LOCKED`: 锁定
 * - `BLOCKED`: 禁用
 * - `EXITED`: 离职
 */
export enum SystemUserStatus {
  NORMAL = 1,
  LOCKED,
  BLOCKED,
  EXITED,
}

/**
 * 字典: 系统用户状态
 *
 * @see {@link SystemUserStatus}
 */
export const SYSTEM_USER_STATUSES: IDict[] = [
  { value: '正常', key: SystemUserStatus.NORMAL, color: ColorName.ARCOBLUE },
  { value: '锁定', key: SystemUserStatus.LOCKED, color: ColorName.ORANGERED },
  { value: '禁用', key: SystemUserStatus.BLOCKED, color: ColorName.RED },
  { value: '离职', key: SystemUserStatus.EXITED, color: ColorName.GRAY },
]
