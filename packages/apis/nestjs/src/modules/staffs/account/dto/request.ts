import { type IStaffAccountStatus, StaffAccountStatusEnum } from '@xiaoshop/schema'
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { PaginationQueryDto } from '~/common'

/**
 * 获取员工账号分页请求 DTO
 */
export class GetAccountPagesRequest extends PaginationQueryDto {
  @ApiProperty({ required: false, description: '员工角色 ID' })
  @IsNumberString()
  @IsOptional()
  readonly roleId: number

  @ApiProperty({ required: false, description: '员工部门 ID' })
  @IsNumberString()
  @IsOptional()
  readonly departmentId: number

  @ApiProperty({ required: false, description: '员工职位 ID' })
  @IsNumberString()
  @IsOptional()
  readonly positionId: number

  @ApiProperty({ required: false, description: '员工姓名', example: example.name })
  @IsString()
  @IsOptional()
  readonly name: string

  @ApiProperty({ required: false, description: '员工手机', example: example.mobile })
  @IsString()
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '员工状态', enum: StaffAccountStatusEnum, example: StaffAccountStatusEnum.NORMAL })
  @IsEnum(StaffAccountStatusEnum)
  @IsOptional()
  readonly status: IStaffAccountStatus
}

/**
 * 获取员工账号请求 DTO
 */
export class GetAccountRequest {
  @ApiProperty({ description: '员工 ID' })
  @IsNumberString()
  @IsNotEmpty()
  readonly id: number
}

/**
 * 删除员工账号请求 DTO
 */
export class DeleteAccountRequest {
  @ApiProperty({ description: '员工 ID' })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number
}
