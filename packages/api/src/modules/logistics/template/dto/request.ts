import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取运费模板请求 DTO
 */
export class GetLogisticsTemplateRequest {
  @ApiProperty({ description: '运费模板 ID', example: 1 })
  @IsNumberString({}, { message: '运费模板 ID 必须为数字' })
  readonly id: number
}

/**
 * 删除运费模板请求 DTO
 */
export class DeleteLogisticsTemplateRequest {
  @ApiProperty({ description: '运费模板 ID', example: 1 })
  @IsNumber({}, { message: '运费模板 ID 必须为数字' })
  readonly id: number
}
