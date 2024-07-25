import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取物流公司请求 DTO
 */
export class GetLogisticsCompanyRequest {
  @ApiProperty({ description: '物流公司 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除物流公司请求 DTO
 */
export class DeleteLogisticsCompanyRequest {
  @ApiProperty({ description: '物流公司 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
