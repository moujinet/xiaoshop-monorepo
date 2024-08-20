import { rimraf } from 'rimraf'
import { getDataSource } from './datasource'

/**
 * 清理数据表
 *
 * @param tables 要清理的表
 */
export async function truncateTable(tables: string[]) {
  const dataSource = await getDataSource()

  for (const table of tables) {
    const exists = await dataSource.query('SHOW TABLES LIKE ?', [table])

    if (exists.length > 0) {
      const result = await dataSource.query(`SELECT * FROM \`${table}\``)

      if (result.length > 0) {
        await dataSource.query(`DELETE FROM \`${table}\``)
      }

      await dataSource.query(`ALTER TABLE \`${table}\` AUTO_INCREMENT = 1`)
    }
  }
}

/**
 * 执行 SQL
 *
 * @param sql 要执行的sql
 */
export async function runSQL(sql: string | string[]) {
  const dataSource = await getDataSource()
  const runs = Array.isArray(sql) ? sql : [sql]

  for (const run of runs) {
    await dataSource.query(run)
  }
}

/**
 * 清理目录
 *
 * @param dirs 要清理的目录
 */
export async function cleanDirs(dirs: string[]) {
  await rimraf(dirs, { glob: true })
}
