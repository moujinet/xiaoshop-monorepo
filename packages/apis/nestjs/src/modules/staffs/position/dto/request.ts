import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { PaginationQueryDto } from '~/common'

/**
 * 查询组织职位分页列表请求 DTO
 */
export class GetPositionPagesRequest extends PaginationQueryDto {
  @ApiProperty({ required: false, description: '部门 ID', example: 0 })
  @IsNumberString()
  @IsOptional()
  readonly departmentId: number

  @ApiProperty({ required: false, description: '职位名称', example: '职位名称' })
  @IsString()
  @IsOptional()
  readonly name: string
}

/**
 * 查询组织职位列表请求 DTO
 */
export class GetPositionListRequest {
  @ApiProperty({ description: '部门 ID', example: 0 })
  @IsNumberString()
  readonly departmentId: number
}

/**
 * 获取组织职位请求 DTO
 */
export class GetPositionRequest {
  @ApiProperty({ description: '组织职位 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除组织职位请求 DTO
 */
export class DeletePositionRequest {
  @ApiProperty({ description: '组织职位 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
