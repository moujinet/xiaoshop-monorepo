import { ProductExportStatus } from '@xiaoshop/shared'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '~/common/dto'

export class GetProductExportPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '导出状态', enum: ProductExportStatus })
  @IsEnum(ProductExportStatus, { message: '导出状态不正确' })
  @IsOptional()
  readonly status?: ProductExportStatus

  @ApiProperty({ required: false, description: '导出时间', example: '2022-01-01,2022-01-02' })
  @IsString({ message: '导出时间格式错误' })
  @IsOptional()
  readonly createdTime?: string
}

export class GetProductExportPostRequest {
  @ApiProperty({ description: '商品导出 ID', example: 1 })
  @IsNumber({}, { message: '商品导出 ID 不正确' })
  @Min(1, { message: '商品导出 ID 不正确' })
  readonly id: number
}
