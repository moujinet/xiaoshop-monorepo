import {
  type IMemberAccountDict,
  type IMemberAccountKey,
  type IMemberAccountStatus,
  MemberAccountKey,
  MemberAccountStatus,
} from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { account } from '../example'

/**
 * 会员账户响应 DTO
 */
export class MemberAccountResponse {
  @ApiProperty({ description: '账户标识', enum: MemberAccountKey, example: account.key })
  readonly key: IMemberAccountKey

  @ApiProperty({ description: '账户状态', enum: MemberAccountStatus, example: account.status })
  readonly status: IMemberAccountStatus

  @ApiProperty({ description: '账户名', example: account.name })
  readonly name: string

  @ApiProperty({ description: '账户值', example: account.value })
  readonly value: number
}

/**
 * 会员账户字典响应
 */
export class MemberAccountDictResponse
  extends PickType(MemberAccountResponse, [
    'key',
    'name',
    'value',
  ] as const)
  implements IMemberAccountDict {}
