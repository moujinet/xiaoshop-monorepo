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
 * - `INFO`: 信息
 * - `WARN`: 警告
 * - `ERROR`: 错误
 */
export enum SystemLogLevel {
  INFO = 1,
  WARN,
  ERROR,
}

/**
 * 字典: 系统日志级别
 *
 * @see {@link SystemLogLevel}
 */
export const SYSTEM_LOG_LEVELS: IDict[] = [
  { value: '信息', key: SystemLogLevel.INFO, color: ColorName.CYAN },
  { value: '警告', key: SystemLogLevel.WARN, color: ColorName.ORANGERED },
  { value: '错误', key: SystemLogLevel.ERROR, color: ColorName.RED },
]
