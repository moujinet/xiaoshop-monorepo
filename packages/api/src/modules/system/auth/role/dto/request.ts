import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetSystemRolePagesRequest extends PaginationRequest {}

export class GetSystemRoleInfoRequest {
  @IsNumberString({}, { message: '角色 ID 不正确' })
  @IsNotEmpty({ message: '角色 ID 不能为空' })
  id: number
}

export class DeleteSystemRoleRequest {
  @IsNumber({}, { message: '角色 ID 不正确' })
  id: number
}
