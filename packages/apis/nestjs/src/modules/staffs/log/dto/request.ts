import { type IStaffLogType, StaffLogTypeEnum } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsMobilePhone, IsOptional, IsString } from 'class-validator'
import { example } from './example'
import { PaginationQueryDto } from '~/common'

/**
 * 获取员工操作日志分页请求 DTO
 */
export class GetStaffLogPagesRequest extends PaginationQueryDto {
  @ApiProperty({ required: false, description: '日志类型', enum: StaffLogTypeEnum, example: example.type })
  @IsEnum(StaffLogTypeEnum)
  @IsOptional()
  readonly type: IStaffLogType

  @ApiProperty({ required: false, description: '员工姓名', example: example.staff.name })
  @IsString()
  @IsOptional()
  readonly name: string

  @ApiProperty({ required: false, description: '员工账号', example: example.staff.username })
  @IsString()
  @IsOptional()
  readonly username: string

  @ApiProperty({ required: false, description: '员工手机', example: example.staff.mobile })
  @IsMobilePhone('zh-CN')
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '操作时间', example: '2022-01-01, 2022-01-02' })
  @IsString()
  @IsOptional()
  readonly time: string
}
