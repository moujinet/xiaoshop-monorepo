import { AuthLogType } from '@xiaoshop/shared'
import { IsEnum, IsMobilePhone, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { PaginationRequest } from '~/common/dto'

/**
 * 获取员工操作日志分页请求 DTO
 */
export class GetAuthLogPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '日志类型', enum: AuthLogType, example: example.type })
  @IsEnum(AuthLogType, { message: '日志类型不正确' })
  @IsOptional()
  readonly type: AuthLogType

  @ApiProperty({ required: false, description: '日志模块', example: 'module' })
  @IsString({ message: '日志模块不正确' })
  @IsOptional()
  readonly module: string

  @ApiProperty({ required: false, description: '员工姓名', example: '员工姓名' })
  @IsString({ message: '员工姓名不正确' })
  @IsOptional()
  readonly name: string

  @ApiProperty({ required: false, description: '员工账号', example: 'username' })
  @IsString({ message: '员工账号不正确' })
  @IsOptional()
  readonly username: string

  @ApiProperty({ required: false, description: '员工手机', example: '1234567890' })
  @IsMobilePhone('zh-CN', {}, { message: '员工手机不正确' })
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '操作时间', example: '2022-01-01,2022-01-02' })
  @IsString({ message: '操作时间不正确' })
  @IsOptional()
  readonly createdTime: string
}
