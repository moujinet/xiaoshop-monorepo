import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

/**
 * Invite Member
 */
export class InviteMemberPayload {
  @IsString({ message: '会员邀请码不正确' })
  @IsNotEmpty({ message: '会员邀请码不能为空' })
  readonly inviteCode: string

  @IsNumber({}, { message: '受邀会员 ID 不正确' })
  readonly inviteeId: number
}
