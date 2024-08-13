import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

/**
 * 登录员工账号请求 DTO
 */
export class StaffLoginPayload {
  @ApiProperty({ description: '员工账号', example: 'user' })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ description: '员工密码', example: '123456' })
  @IsString()
  @IsNotEmpty()
  readonly password: string
}
