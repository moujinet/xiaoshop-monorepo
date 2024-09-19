import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

export class GetSystemDepartmentInfoRequest {
  @IsNumberString({}, { message: '部门 ID 不正确' })
  @IsNotEmpty({ message: '部门 ID 不能为空' })
  readonly id: number
}

export class DeleteSystemDepartmentRequest {
  @IsNumber({}, { message: '部门 ID 不正确' })
  readonly id: number
}
