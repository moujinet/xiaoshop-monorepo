import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

export class UpdateSystemSettingsPayload {
  @IsString({ message: '设置名不正确' })
  @IsNotEmpty({ message: '设置名不能为空' })
  readonly key: string

  @IsString({ message: '设置值不正确' })
  @IsOptional()
  readonly value?: string
}

export class BatchUpdateSystemSettingsPayload {
  @ValidateNested({ message: '设置项不正确' })
  @Type(() => UpdateSystemSettingsPayload)
  readonly settings: UpdateSystemSettingsPayload[]
}
