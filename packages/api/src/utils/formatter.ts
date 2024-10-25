import { DEFAULT_DATETIME_FORMAT } from '~/common/constants/intl.constant'

import { dayjs } from './datetime'

export type IDateTime = dayjs.ConfigType

/**
 * 转换为 UTC 日期
 *
 * @param date 日期
 * @returns UTC 日期
 */
export function toUtcDateTime(date?: IDateTime) {
  return dayjs(date).utc()
}

/**
 * 转换为当前时区日期
 *
 * @param date 日期
 * @returns 当前时区日期
 */
export function toLocalDateTime(date?: IDateTime) {
  return dayjs(date).local()
}

/**
 * 获取 UTC 日期
 *
 * @param format 格式
 * @returns UTC 日期
 */
export function utcNow(format?: string) {
  return dayjs().utc().format(format)
}

/**
 * 获取当前时区日期
 *
 * @param format 格式
 * @returns 当前时区日期
 */
export function localNow(format?: string) {
  return dayjs().local().format(format)
}

/**
 * 格式化日期时间
 *
 * @param date 日期时间
 * @param format 格式
 * @returns 格式化后的日期
 */
export function formatDateTime(
  date: IDateTime,
  format = DEFAULT_DATETIME_FORMAT,
) {
  return toLocalDateTime(date).format(format)
}

/**
 * 计算两个日期之间相差的天数
 *
 * @param fromDate 开始日期
 * @param toDate 结束日期
 * @returns 相差的天数
 */
export function diffDateTime(
  fromDate: IDateTime,
  toDate: IDateTime,
) {
  return toUtcDateTime(toDate).diff(toUtcDateTime(fromDate), 'day')
}

/**
 * 获取指定天数后的日期
 *
 * @param fromDate 开始日期
 * @param value 持续时间
 * @param unit 时间单位
 * @returns 计算后的 Dayjs 对象
 */
export function afterDateTime(
  fromDate: IDateTime,
  value: number,
  unit: 'year' | 'month' | 'day' = 'day',
) {
  return toUtcDateTime(fromDate).add(value, unit)
}

/**
 * 获取指定天数前的日期
 *
 * @param fromDate 开始日期
 * @param value 持续时间
 * @param unit 时间单位
 * @returns 计算后的 Dayjs 对象
 */
export function beforeDateTime(
  fromDate: IDateTime,
  value: number,
  unit: 'year' | 'month' | 'day' = 'day',
) {
  return toUtcDateTime(fromDate).subtract(value, unit)
}
