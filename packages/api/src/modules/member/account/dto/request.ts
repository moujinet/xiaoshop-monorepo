import type { MemberGender, MemberSource, MemberStatus } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Member Pages
 */
export class GetMemberPagesRequest extends PaginationDto {
  @IsNumberString({}, { message: '注册来源不正确' })
  @IsOptional()
  readonly source: MemberSource

  @IsNumberString({}, { message: '会员状态不正确' })
  @IsOptional()
  readonly status: MemberStatus

  @IsString({ message: '会员账号不正确' })
  @IsOptional()
  readonly username: string

  @IsString({ message: '会员昵称不正确' })
  @IsOptional()
  readonly nickname: string

  @IsString({ message: '会员手机号不正确' })
  @IsOptional()
  readonly mobile: string

  @IsNumberString({}, { message: '会员性别不正确' })
  @IsOptional()
  readonly gender: MemberGender

  @IsNumberString({}, { message: '会员分组 ID 不正确' })
  @IsOptional()
  readonly groupId: number

  @IsNumberString({}, { message: '会员标签 ID 不正确' })
  @IsOptional()
  readonly tagId: number

  @IsNumberString({}, { message: '会员等级 ID 不正确' })
  @IsOptional()
  readonly cardId: number

  @IsString({ message: '会员积分不正确' })
  @IsOptional()
  readonly points: string

  @IsString({ message: '成长值不正确' })
  @IsOptional()
  readonly exp: string

  @IsString({ message: '账户余额不正确' })
  @IsOptional()
  readonly balance: string

  @IsString({ message: '消费次数不正确' })
  @IsOptional()
  readonly orderCount: string

  @IsString({ message: '消费金额不正确' })
  @IsOptional()
  readonly orderAmount: string

  @IsString({ message: '累计签到次数不正确' })
  @IsOptional()
  readonly checkInTimes: string

  @IsString({ message: '连续签到天数不正确' })
  @IsOptional()
  readonly checkInDays: string

  @IsString({ message: '最后登录时间不正确' })
  @IsOptional()
  readonly lastLoginTime: string

  @IsString({ message: '注册时间不正确' })
  @IsOptional()
  readonly createdTime: string
}

/**
 * Get Member
 */
export class GetMemberRequest {
  @IsNumberString({}, { message: '会员 ID 不正确' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly id: number
}
