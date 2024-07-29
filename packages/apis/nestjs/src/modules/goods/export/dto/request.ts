import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'
import { PaginationQueryDto } from '~/common'

/**
 * 获取导出记录分页列表请求 DTO
 */
export class GetGoodsExportRecordPagesRequest extends PaginationQueryDto {}

/**
 * 获取导出记录请求 DTO
 */
export class GetGoodsExportRecordRequest {
  @ApiProperty({ description: '导出记录 ID', example: 1 })
  @IsNumberString()
  id: number
}

/**
 * 删除导出记录请求 DTO
 */
export class DeleteGoodsExportRecordRequest {
  @ApiProperty({ description: '导出记录 ID', example: 1 })
  @IsNumber()
  id: number
}
