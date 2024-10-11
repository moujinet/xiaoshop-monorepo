import {
  ColorName,
  type IDict,
  SystemUserStatus,
} from '@xiaoshop/shared'

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
