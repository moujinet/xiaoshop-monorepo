import type { IMemberAccountKey } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

export class GetMemberAccountRequest {
  @IsNumberString({}, { message: '会员 ID 不正确' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly memberId: number

  @IsString({ message: '会员账户标识不正确' })
  @IsOptional()
  readonly key?: IMemberAccountKey
}
