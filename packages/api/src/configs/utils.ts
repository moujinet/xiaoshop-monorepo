import conf from '~/configs'

/**
 * 获得完整表名
 *
 * @param tableName 表名
 * @returns 完整表名
 */
export function getFullTableName(tableName: string) {
  return `${conf().db.mysql.entityPrefix || ''}${tableName}`
}
