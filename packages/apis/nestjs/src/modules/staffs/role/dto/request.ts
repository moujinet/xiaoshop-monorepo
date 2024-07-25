import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'
import { PaginationQueryDto } from '~/common'

/**
 * 查询员工角色分页列表请求 DTO
 */
export class GetRolePagesRequest extends PaginationQueryDto {}

/**
 * 获取员工角色请求 DTO
 */
export class GetRoleRequest {
  @ApiProperty({ description: '员工角色 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除员工角色请求 DTO
 */
export class DeleteRoleRequest {
  @ApiProperty({ description: '员工角色 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
