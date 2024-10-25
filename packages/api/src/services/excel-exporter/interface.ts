export interface IExcelExporterColumn<T> {
  key: keyof T
  label: string
  dictionary?: boolean
  mapper?: (value: any) => any
}

/**
 * Excel 导出配置
 */
export interface IExcelExporterOptions<T> {
  /**
   * 导出目录
   */
  outDir: string
  /**
   * 导出文件名
   */
  fileName: string
  /**
   * 导出列
   */
  columns: IExcelExporterColumn<T>[]
}
