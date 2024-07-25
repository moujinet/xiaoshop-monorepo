import {
  EnabledEnum,
  type IEnabled,
  type IStaffAccountInfo,
  type IStaffAccountStatus,
  StaffAccountStatusEnum,
} from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { example } from './example'

/**
 * 创建员工账号 DTO
 */
export class RegisterAccountPayload {
  @ApiProperty({ description: '员工账号', example: example.username })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ description: '员工密码', example: '123456' })
  @IsString()
  @IsNotEmpty()
  readonly password: string

  @ApiProperty({ description: '员工姓名', example: example.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ description: '员工手机', example: example.mobile })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  readonly mobile: string

  @ApiProperty({ type: [Number], required: false, description: '员工角色 IDs' })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly roleIds: number[]

  @ApiProperty({ required: false, description: '所属部门 ID' })
  @IsNumber()
  @IsOptional()
  readonly departmentId: number

  @ApiProperty({ required: false, description: '所属职位 ID' })
  @IsNumber()
  @IsOptional()
  readonly positionId: number

  @ApiProperty({ description: '是否管理员', enum: EnabledEnum, default: EnabledEnum.NO })
  @IsEnum(EnabledEnum)
  @IsNotEmpty()
  readonly isAdmin: IEnabled

  @ApiProperty({ description: '员工状态', enum: StaffAccountStatusEnum, default: StaffAccountStatusEnum.NORMAL })
  @IsEnum(StaffAccountStatusEnum)
  @IsNotEmpty()
  readonly status: IStaffAccountStatus
}

/**
 * 更新员工账号 DTO
 */
export class UpdateAccountPayload extends RegisterAccountPayload {
  @ApiProperty({ required: false, description: '员工密码', example: '123456' })
  @IsString()
  @IsOptional()
  readonly password: string
}

/**
 * 员工信息关联 DTO
 */
export class AccountInfoPayload
  extends PickType(RegisterAccountPayload, ['name', 'username', 'mobile'] as const)
  implements IStaffAccountInfo {
  @ApiProperty({ description: '员工 ID' })
  @IsNumber()
  readonly id: number
}
