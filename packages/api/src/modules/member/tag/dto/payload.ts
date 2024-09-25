import { IColorName } from '@xiaoshop/shared'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class MemberTagPayload {
  @IsString({ message: '标签名称不正确' })
  @IsNotEmpty({ message: '标签名称不能为空' })
  readonly name: string

  @IsString({ message: '标签颜色不正确' })
  @IsOptional()
  readonly color?: IColorName
}
