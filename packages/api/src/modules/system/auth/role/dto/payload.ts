import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class SystemRolePayload {
  @IsString({ message: '角色名称不正确' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  readonly name: string

  @IsString({ message: '角色描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsString({ each: true, message: '角色权限不正确' })
  @ArrayNotEmpty({ message: '角色权限不能为空' })
  readonly permissions: string[]

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number
}
