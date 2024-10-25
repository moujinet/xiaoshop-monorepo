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
