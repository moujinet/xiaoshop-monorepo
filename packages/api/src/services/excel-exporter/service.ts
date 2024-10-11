import type { IExcelExporterColumn, IExcelExporterOptions } from './interface'

import { join } from 'node:path'
import { utils, writeFile } from 'xlsx'
import { ConfigService } from '@nestjs/config'
import { Inject, Injectable } from '@nestjs/common'

import { ensureLocalDir } from '~/utils/fs'

@Injectable()
export class ExcelExporterService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  /**
   * 导出
   *
   * @param data 导出数据
   * @param options 导出选项
   * @returns 导出文件路径
   */
  export<T extends Record<string, any>>(
    data: T[],
    options: IExcelExporterOptions<T>,
  ): string {
    try {
      const rows: any[] = []

      for (const item of data) {
        const row: any = {}

        for (const col of options.columns) {
          if (col.key in item) {
            row[col.key] = this.toValue<T>(col, item[col.key])
          }
        }

        rows.push(row)
      }

      const workbook = utils.book_new()
      const worksheet = utils.json_to_sheet(rows)

      utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      utils.sheet_add_aoa(worksheet, [
        options.columns.map(item => item.label),
      ], { origin: 'A1' })

      worksheet['!cols'] = options.columns.map(
        col => ({
          wch: rows.reduce((w, r) => Math.max(w, r[col.key].length), 10),
        }),
      )

      const baseDir = this.config.get<string>('export.path')
      const outputDir = ensureLocalDir(join(baseDir, options.outDir), 'xlsx')
      const dest = join(outputDir, `${options.fileName}.xlsx`)

      writeFile(workbook, dest, {
        compression: true,
      })

      return dest
    }
    catch (e) {
      return e
    }
  }

  /**
   * 转换数据
   *
   * @param column 列配置
   * @param item 数据
   * @returns 列数据
   */
  toValue<T>(column: IExcelExporterColumn<T>, item: any) {
    if (column.dictionary) {
      return item.value
    }
    else if (column.mapper) {
      return column.mapper(item)
    }

    return item
  }
}
