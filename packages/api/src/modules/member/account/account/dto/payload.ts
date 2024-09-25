import type { IMemberAccountKey } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class MemberAccountPayload {
  @IsString({ message: '会员账户标识不正确' })
  @IsNotEmpty({ message: '会员账户标识不能为空' })
  readonly key: IMemberAccountKey

  @IsNumber({}, { message: '会员账户值不正确' })
  readonly value: number
}
