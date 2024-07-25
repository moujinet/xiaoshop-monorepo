import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取组织部门请求 DTO
 */
export class GetDepartmentRequest {
  @ApiProperty({ description: '组织部门 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除组织部门请求 DTO
 */
export class DeleteDepartmentRequest {
  @ApiProperty({ description: '组织部门 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
