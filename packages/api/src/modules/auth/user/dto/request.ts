import { AuthUserStatus } from '@xiaoshop/shared'
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { PaginationRequest } from '~/common/dto'

/**
 * 获取员工账号分页请求 DTO
 */
export class GetAuthUserPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '员工角色 ID' })
  @IsNumberString({}, { message: '员工角色 ID 必须为数字' })
  @IsOptional()
  readonly roleId: number

  @ApiProperty({ required: false, description: '员工部门 ID' })
  @IsNumberString({}, { message: '员工部门 ID 必须为数字' })
  @IsOptional()
  readonly departmentId: number

  @ApiProperty({ required: false, description: '员工职位 ID' })
  @IsNumberString({}, { message: '员工职位 ID 必须为数字' })
  @IsOptional()
  readonly positionId: number

  @ApiProperty({ required: false, description: '员工姓名', example: example.name })
  @IsString({ message: '员工姓名必须为字符串' })
  @IsOptional()
  readonly name: string

  @ApiProperty({ required: false, description: '员工手机', example: example.mobile })
  @IsString({ message: '员工手机必须为字符串' })
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '员工状态', enum: AuthUserStatus, example: AuthUserStatus.NORMAL })
  @IsEnum(AuthUserStatus, { message: '员工状态必须为 AuthUserStatus 类型' })
  @IsOptional()
  readonly status: AuthUserStatus
}

/**
 * 获取员工账号请求 DTO
 */
export class GetAuthUserRequest {
  @ApiProperty({ description: '员工 ID' })
  @IsNumberString({}, { message: '员工 ID 必须为数字' })
  @IsNotEmpty({ message: '员工 ID 不能为空' })
  readonly id: number
}

/**
 * 删除员工账号请求 DTO
 */
export class DeleteAuthUserRequest {
  @ApiProperty({ description: '员工 ID' })
  @IsNumber({}, { message: '员工 ID 必须为数字' })
  @IsNotEmpty({ message: '员工 ID 不能为空' })
  readonly id: number
}
