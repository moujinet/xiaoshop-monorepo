import type {
  IEnabled,
  IStaffDepartmentDict,
  IStaffLoginProfile,
  IStaffLoginToken,
  IStaffPositionDict,
  IStaffRoleInfo,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 登录员工账号响应 DTO
 */
export class StaffLoginTokenResponse implements IStaffLoginToken {
  @ApiProperty({ description: 'TOKEN' })
  readonly token: string
}

/**
 * 登录员工账号响应 DTO
 */
export class StaffLoginProfileResponse implements IStaffLoginProfile {
  @ApiProperty({ description: '员工 ID', example: 1 })
  id: number

  @ApiProperty({ description: '员工姓名', example: '管理员' })
  name: string

  @ApiProperty({ description: '员工账号', example: 'admin' })
  username: string

  @ApiProperty({ description: '是否管理员', example: 'Y' })
  isAdmin: IEnabled

  @ApiProperty({ description: '员工角色', example: [{ id: 1, name: '管理员', permissions: [] }] })
  roles: IStaffRoleInfo[]

  @ApiProperty({ description: '员工部门', example: { id: 1, name: '总裁办' } })
  department: IStaffDepartmentDict

  @ApiProperty({ description: '员工职位', example: { id: 1, name: '总裁' } })
  position: IStaffPositionDict
}
