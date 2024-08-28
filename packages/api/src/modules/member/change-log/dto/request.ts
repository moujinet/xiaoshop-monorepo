import {
  type IMemberAccountChangeType,
  type IMemberAccountKeys,
  MemberAccountChangeType,
} from '@xiaoshop/shared'
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '~/common/dto'

/**
 * 获取会员账户变化分页列表请求 DTO
 */
export class GetMemberAccountChangeLogPagesRequest extends PaginationRequest {
  @ApiProperty({ description: '会员 ID', default: '' })
  @IsNumberString({}, { message: '会员 ID 必须为数字' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly memberId: number

  @ApiProperty({ required: false, description: '变更账户', default: '' })
  @IsString({ message: '变更账户错误' })
  @IsOptional()
  readonly key: IMemberAccountKeys

  @ApiProperty({ required: false, description: '变更类型', enum: MemberAccountChangeType, default: '' })
  @IsEnum(MemberAccountChangeType, { message: '变更类型错误' })
  @IsOptional()
  readonly type: IMemberAccountChangeType
}

/**
 * 获取会员账户变化分页列表请求 DTO
 */
export class GetAllMemberAccountChangeLogPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '变更账户', default: '' })
  @IsString({ message: '变更账户错误' })
  @IsOptional()
  readonly key: IMemberAccountKeys

  @ApiProperty({ required: false, description: '变更类型', enum: MemberAccountChangeType, default: '' })
  @IsEnum(MemberAccountChangeType, { message: '变更类型错误' })
  @IsOptional()
  readonly type: IMemberAccountChangeType
}
