import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取组织部门请求 DTO
 */
export class GetOrganizeDepartmentByIdRequest {
  @ApiProperty({ description: '组织部门 ID', example: 1 })
  @IsNumberString({}, { message: '组织部门 ID 必须为数字' })
  readonly id: number
}

/**
 * 删除组织部门请求 DTO
 */
export class DeleteOrganizeDepartmentByIdRequest {
  @ApiProperty({ description: '组织部门 ID', example: 1 })
  @IsNumber({}, { message: '组织部门 ID 必须为数字' })
  readonly id: number
}
