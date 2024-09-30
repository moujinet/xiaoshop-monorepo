import { IsNotEmpty, IsNumber, IsOptional, IsString, NotEquals } from 'class-validator'

export class SystemPositionPayload {
  @IsNumber({}, { message: '部门 ID 不正确' })
  @NotEquals(0, { message: '部门 ID 不能为 0' })
  readonly departmentId: number

  @IsString({ message: '职位名称不正确' })
  @IsNotEmpty({ message: '职位名称不能为空' })
  readonly name: string

  @IsString({ message: '职位描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number
}
