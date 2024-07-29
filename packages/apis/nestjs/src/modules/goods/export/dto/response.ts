import {
  GoodsExportRecordStatus,
  type IGoodsExportConditions,
  type IGoodsExportRecord,
  type IGoodsExportRecordStatus,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 商品导出响应 DTO
 */
export class GoodsExportResponse implements IGoodsExportRecord {
  @ApiProperty({ description: '导出记录 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '导出状态', enum: GoodsExportRecordStatus, example: GoodsExportRecordStatus.PENDING })
  readonly status: IGoodsExportRecordStatus

  @ApiProperty({ description: '导出条件', example: { status: 'in-stock' } })
  readonly conditions: IGoodsExportConditions

  @ApiProperty({ description: '导出数量', example: 1 })
  readonly count: number

  @ApiProperty({ description: '导出结果', example: '2023/01/01/export/path-to-file.xlsx' })
  readonly result: string

  @ApiProperty({ description: '导出时间', example: (new Date()).toISOString() })
  readonly createdTime: string
}
