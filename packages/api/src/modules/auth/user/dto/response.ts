import {
  AuthUserStatus,
  type IAuthRolePermissions,
  type IAuthUserProfile,
  type IAuthUserToken,
  type IOrganizeDepartmentDict,
  type IOrganizePositionDict,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { AuthRolePermissionsResponse } from '@/auth/role/dto'
import { OrganizePositionDictResponse } from '@/organize/position/dto'
import { OrganizeDepartmentDictResponse } from '@/organize/department/dto'

/**
 * 员工账号响应 DTO
 */
export class AuthUserResponse implements IAuthUserProfile {
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

/**
 * 登录员工账号响应 DTO
 */
export class AuthUserTokenResponse implements IAuthUserToken {
  @ApiProperty({ description: 'TOKEN' })
  readonly token: string
}
