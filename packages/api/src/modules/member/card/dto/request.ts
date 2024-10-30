import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

/**
 * Get Member Card By Member
 */
export class GetByMemberRequest {
  @IsNumberString({}, { message: '会员 ID 不正确' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly memberId: number
}

/**
 * Get Member Card
 */
export class GetMemberCardRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Delete Member Custom Card
 */
export class DeleteMemberCustomCardRequest {
  @IsNumber({}, { message: 'ID 不正确' })
  readonly id: number
}
