import { Between } from 'typeorm'

import conf from '~/config'

/**
 * 字符串转换为 Between 数值操作符
 *
 * @param str 字符串
 * @returns FindOperator
 */
export function toBetweenNumber(str: string) {
  const [min, max] = str.split(',').map(Number)
  return Between(min, max)
}

/**
 * 字符串转换为 Between 日期操作符
 *
 * @param str 字符串
 * @returns FindOperator
 */
export function toBetweenDate(str: string) {
  const [from, to] = str.split(',')
  return Between(`${from} 00:00:00`, `${to} 23:59:59`)
}

/**
 * 获得完整表名
 *
 * @param tableName 表名
 * @returns 完整表名
 */
export function toFullTableName(tableName: string) {
  return `${conf().mysql.entityPrefix || ''}${tableName}`
}
