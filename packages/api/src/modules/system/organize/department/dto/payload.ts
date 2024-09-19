import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class SystemDepartmentPayload {
  @IsNumber({}, { message: '部门 ID 不正确' })
  @IsOptional()
  readonly parentId?: number

  @IsString({ message: '部门名称不正确' })
  @IsNotEmpty({ message: '部门名称不能为空' })
  readonly name: string

  @IsString({ message: '部门描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number
}
