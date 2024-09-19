import { ColorName, type IDict } from '~/common'

// --------------------------------
// 系统 - 日志 - 类型
// --------------------------------

/**
 * 系统日志类型
 *
 * - `USER` 用户日志
 * - `SYSTEM` 系统日志
 */
export enum SystemLogType {
  USER = 1,
  SYSTEM,
}

/**
 * 字典: 系统日志类型
 *
 * @see {@link SystemLogType}
 */
export const SYSTEM_LOG_TYPES: IDict[] = [
  { value: '用户日志', key: SystemLogType.USER, color: ColorName.ORANGERED },
  { value: '系统日志', key: SystemLogType.SYSTEM, color: ColorName.ARCOBLUE },
]

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

/**
 * 字典: 系统日志级别
 *
 * @see {@link SystemLogLevel}
 */
export const SYSTEM_LOG_LEVELS: IDict[] = [
  { value: '操作', key: SystemLogLevel.INFO, color: ColorName.CYAN },
  { value: '警告', key: SystemLogLevel.WARN, color: ColorName.ORANGERED },
  { value: '危险', key: SystemLogLevel.DANGER, color: ColorName.RED },
]
