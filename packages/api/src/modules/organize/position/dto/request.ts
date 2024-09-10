import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '~/common/dto'

/**
 * 查询组织职位分页列表请求 DTO
 */
export class GetOrganizePositionPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '部门 ID', example: 0 })
  @IsNumberString({}, { message: '部门 ID 必须为数字' })
  @IsOptional()
  readonly departmentId: number

  @ApiProperty({ required: false, description: '职位名称', example: '职位名称' })
  @IsString({ message: '职位名称必须为字符串' })
  @IsOptional()
  readonly name: string
}

/**
 * 查询组织职位列表请求 DTO
 */
export class GetOrganizePositionListRequest {
  @ApiProperty({ description: '部门 ID', example: 0 })
  @IsNumberString({}, { message: '部门 ID 必须为数字' })
  readonly departmentId: number
}

/**
 * 获取组织职位请求 DTO
 */
export class GetOrganizePositionRequest {
  @ApiProperty({ description: '组织职位 ID', example: 1 })
  @IsNumberString({}, { message: '组织职位 ID 必须为数字' })
  readonly id: number
}

/**
 * 删除组织职位请求 DTO
 */
export class DeleteOrganizePositionRequest {
  @ApiProperty({ description: '组织职位 ID', example: 1 })
  @IsNumber({}, { message: '组织职位 ID 必须为数字' })
  readonly id: number
}
