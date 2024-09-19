import {
  ColorName,
  type IDict,
  SystemLogLevel,
  SystemLogType,
} from '@xiaoshop/shared'

/**
 * 字典: 系统日志类型
 *
 * @see {@link SystemLogType}
 */
export const SYSTEM_LOG_TYPES: IDict[] = [
  { value: '用户日志', key: SystemLogType.USER, color: ColorName.ORANGERED },
  { value: '系统日志', key: SystemLogType.SYSTEM, color: ColorName.ARCOBLUE },
]

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
