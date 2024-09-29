import { IsNotEmpty, IsString } from 'class-validator'

export class GetSystemSettingsRequest {
  @IsString({ message: '设置名不正确' })
  @IsNotEmpty({ message: '设置名不能为空' })
  readonly key: string
}
