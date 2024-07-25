import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取运费模板请求 DTO
 */
export class GetFreightTemplateRequest {
  @ApiProperty({ description: '运费模板 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除运费模板请求 DTO
 */
export class DeleteFreightTemplateRequest {
  @ApiProperty({ description: '运费模板 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
