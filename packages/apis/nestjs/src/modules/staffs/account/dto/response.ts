import {
  EnabledEnum,
  type IEnabled,
  type IStaffAccountProfile,
  type IStaffAccountStatus,
  type IStaffDepartmentDict,
  type IStaffPositionDict,
  type IStaffRoleInfo,
  StaffAccountStatusEnum,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { RoleInfoResponse } from '@/staffs/role/dto'
import { PositionDictResponse } from '@/staffs/position/dto'
import { DepartmentDictResponse } from '@/staffs/department/dto'

/**
 * 员工账号响应 DTO
 */
export class AccountResponse implements IStaffAccountProfile {
  @ApiProperty({ description: '员工 ID' })
  readonly id: number

  @ApiProperty({ description: '是否管理员', enum: EnabledEnum, default: EnabledEnum.NO })
  readonly isAdmin: IEnabled

  @ApiProperty({ description: '员工状态', enum: StaffAccountStatusEnum, default: StaffAccountStatusEnum.NORMAL })
  readonly status: IStaffAccountStatus

  @ApiProperty({ description: '员工账号', example: example.username })
  readonly username: string

  @ApiProperty({ description: '员工姓名', example: example.name })
  readonly name: string

  @ApiProperty({ description: '员工手机', example: example.mobile })
  readonly mobile: string

  @ApiProperty({ type: 'datetime', description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ type: 'datetime', description: '最后登录时间' })
  readonly lastLoginTime: string

  @ApiProperty({ type: [RoleInfoResponse], description: '员工角色' })
  readonly roles: IStaffRoleInfo[]

  @ApiProperty({ type: DepartmentDictResponse, description: '员工部门' })
  readonly department: IStaffDepartmentDict

  @ApiProperty({ type: PositionDictResponse, description: '员工职位' })
  readonly position: IStaffPositionDict
}
