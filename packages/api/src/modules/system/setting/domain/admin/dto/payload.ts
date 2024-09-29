import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateSystemSettingPayload {
  @IsString({ message: '设置名不正确' })
  @IsNotEmpty({ message: '设置名不能为空' })
  readonly key: string

  @IsString({ message: '设置值不正确' })
  @IsNotEmpty({ message: '设置值不能为空' })
  readonly value: string
}
