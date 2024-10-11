import { IsNotEmpty, IsString } from 'class-validator'

export class GetSystemSettingRequest {
  @IsString({ message: '设置键不正确' })
  @IsNotEmpty({ message: '设置键不能为空' })
  readonly key: string
}
