import { IsNumber, IsNumberString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 获取物流公司请求 DTO
 */
export class GetLogisticsCompanyRequest {
  @ApiProperty({ description: '物流公司 ID', example: 1 })
  @IsNumberString({}, { message: '物流公司 ID 必须为数字' })
  readonly id: number
}

/**
 * 删除物流公司请求 DTO
 */
export class DeleteLogisticsCompanyRequest {
  @ApiProperty({ description: '物流公司 ID', example: 1 })
  @IsNumber({}, { message: '物流公司 ID 必须为数字' })
  readonly id: number
}
