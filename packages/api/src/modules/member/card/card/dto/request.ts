import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

export class GetMemberCardInfoRequest {
  @IsNumberString({}, { message: '会员卡 ID 不正确' })
  @IsNotEmpty({ message: '会员卡 ID 不能为空' })
  readonly id: number
}

export class DeleteMemberCardRequest {
  @IsNumber({}, { message: '会员卡 ID 不正确' })
  readonly id: number
}
