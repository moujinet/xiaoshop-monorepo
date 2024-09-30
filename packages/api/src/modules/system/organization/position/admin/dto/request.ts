import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, NotEquals } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetSystemPositionPagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '部门 ID 不正确' })
  @NotEquals(0, { message: '部门 ID 不能为 0' })
  @IsOptional()
  readonly departmentId?: number
}

export class GetSystemPositionListRequest {
  @IsNumberString({}, { message: '部门 ID 不正确' })
  @NotEquals(0, { message: '部门 ID 不能为 0' })
  @IsNotEmpty({ message: '部门 ID 不能为空' })
  readonly departmentId: number
}

export class GetSystemPositionInfoRequest {
  @IsNumberString({}, { message: '职位 ID 不正确' })
  @IsNotEmpty({ message: '职位 ID 不能为空' })
  readonly id: number
}

export class DeleteSystemPositionRequest {
  @IsNumber({}, { message: '职位 ID 不正确' })
  readonly id: number
}
