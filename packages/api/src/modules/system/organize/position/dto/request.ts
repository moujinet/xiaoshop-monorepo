import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, NotEquals } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetSystemDepartmentPositionPagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '部门 ID 不正确' })
  @NotEquals(0, { message: '部门 ID 不能为 0' })
  @IsOptional()
  readonly departmentId?: number
}

export class GetSystemDepartmentPositionListRequest {
  @IsNumberString({}, { message: '部门 ID 不正确' })
  @NotEquals(0, { message: '部门 ID 不能为 0' })
  @IsNotEmpty({ message: '部门 ID 不能为空' })
  readonly departmentId: number
}

export class GetSystemDepartmentPositionInfoRequest {
  @IsNumberString({}, { message: '职位 ID 不正确' })
  @IsNotEmpty({ message: '职位 ID 不能为空' })
  readonly id: number
}

export class DeleteSystemDepartmentPositionRequest {
  @IsNumber({}, { message: '职位 ID 不正确' })
  readonly id: number
}
