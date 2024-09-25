import type { IMemberInfo } from '@xiaoshop/shared'

import { IsNumber, IsOptional } from 'class-validator'

export class MemberCardBindingPayload {
  @IsNumber({}, { each: true, message: '会员 ID 不正确' })
  readonly memberIds: IMemberInfo['id'][]

  @IsNumber({}, { message: '会员卡 ID 不正确' })
  readonly cardId: number

  @IsNumber({}, { message: '会员卡套餐 ID 不正确' })
  @IsOptional()
  readonly planId?: number

  @IsNumber({}, { message: '绑定原因不正确' })
  @IsOptional()
  readonly reason?: string
}
