import {
  type IProductExport,
  type IProductExportConditions,
  ProductExportStatus,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'

export class ProductExportResponse implements IProductExport {
  @ApiProperty({ description: '导出记录 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '导出状态', enum: ProductExportStatus, example: ProductExportStatus.PENDING })
  readonly status: ProductExportStatus

  @ApiProperty({ description: '导出条件', example: { status: 'in-stock' } })
  readonly conditions: IProductExportConditions

  @ApiProperty({ description: '导出数量', example: 1 })
  readonly count: number

  @ApiProperty({ description: '导出文件路径', example: '2023/01/01/export/path-to-file.xlsx' })
  readonly filePath: string

  @ApiProperty({ description: '导出时间', example: (new Date()).toISOString() })
  readonly createdTime: string
}
