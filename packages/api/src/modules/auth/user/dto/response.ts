import {
  AuthUserStatus,
  type IAuthRolePermissions,
  type IAuthUserInfo,
  type IAuthUserList,
  type IAuthUserToken,
  type IOrganizeDepartmentDict,
  type IOrganizePositionDict,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'
import { AuthRolePermissionsResponse } from '@/auth/role/dto'
import { OrganizePositionDictResponse } from '@/organize/position/dto'
import { OrganizeDepartmentDictResponse } from '@/organize/department/dto'

export class AuthUserListResponse implements IAuthUserList {
  @ApiProperty({ description: '员工 ID' })
  readonly id: number

  @ApiProperty({ description: '是否管理员', enum: YesOrNo, default: YesOrNo.NO })
  readonly isAdmin: YesOrNo

  @ApiProperty({ description: '员工状态', enum: AuthUserStatus, default: AuthUserStatus.NORMAL })
  readonly status: AuthUserStatus

  @ApiProperty({ type: [AuthRolePermissionsResponse], description: '员工角色' })
  readonly roles: IAuthRolePermissions[]

  @ApiProperty({ description: '员工账号', example: example.username })
  readonly username: string

  @ApiProperty({ description: '员工姓名', example: example.name })
  readonly name: string

  @ApiProperty({ description: '员工手机', example: example.mobile })
  readonly mobile: string

  @ApiProperty({ type: OrganizeDepartmentDictResponse, description: '员工部门' })
  readonly department: IOrganizeDepartmentDict

  @ApiProperty({ type: OrganizePositionDictResponse, description: '员工职位' })
  readonly position: IOrganizePositionDict

  @ApiProperty({ type: 'datetime', description: '最后登录时间' })
  readonly lastLoginTime: string
}

export class AuthUserInfoResponse
  extends PickType(AuthUserListResponse, [
    'id',
    'isAdmin',
    'status',
    'roles',
    'username',
    'name',
    'mobile',
    'department',
    'position',
    'lastLoginTime',
  ] as const)
  implements IAuthUserInfo {}

export class AuthUserTokenResponse implements IAuthUserToken {
  @ApiProperty({ description: 'TOKEN' })
  readonly token: string
}
