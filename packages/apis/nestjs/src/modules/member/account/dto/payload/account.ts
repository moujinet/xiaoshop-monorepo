import {
  type IMemberAccountKey,
  type IMemberAccountStatus,
  MemberAccountKey,
  MemberAccountStatus,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { account } from '../example'

/**
 * 更新会员账户 DTO
 */
export class UpdateMemberAccountPayload {
  @ApiProperty({ description: '账户标识', enum: MemberAccountKey, example: account.key })
  @IsEnum(MemberAccountKey)
  @IsNotEmpty()
  readonly key: IMemberAccountKey

  @ApiProperty({ required: false, description: '账户状态', enum: MemberAccountStatus, example: account.status })
  @IsEnum(MemberAccountStatus)
  @IsOptional()
  readonly status: IMemberAccountStatus

  @ApiProperty({ required: false, description: '账户值', example: account.value })
  @IsNumber()
  @IsOptional()
  readonly value: number
}

/**
 * 批量更新会员账户 DTO
 */
export class BatchUpdateMemberAccountPayload {
  @ApiProperty({ description: '会员 ID', example: [1] })
  @IsNumber({}, { each: true })
  @IsArray()
  readonly ids: number[]

  @ApiProperty({ description: '会员账户' })
  @ValidateNested()
  @Type(() => UpdateMemberAccountPayload)
  readonly account: UpdateMemberAccountPayload
}
