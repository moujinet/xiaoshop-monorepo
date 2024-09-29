// --------------------------------
// 系统 - 日志 - 类型
// --------------------------------

/**
 * 系统日志类型
 *
 * - `ADMIN` 用户日志
 * - `SYSTEM` 系统日志
 */
export enum SystemLogType {
  ADMIN = 1,
  SYSTEM,
}

// --------------------------------
// 系统 - 日志 - 级别
// --------------------------------

/**
 * 系统日志级别
 *
 * - `INFO`: 操作
 * - `WARN`: 警告
 * - `DANGER`: 危险
 */
export enum SystemLogLevel {
  INFO = 1,
  WARN,
  DANGER,
}
