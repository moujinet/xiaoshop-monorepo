import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

/**
 * 获取系统设置请求 DTO
 */
export class GetSettingsByKeyRequest {
  @ApiProperty({ description: '设置名', example: 'settings.key' })
  @IsString({ message: '设置名必须为字符串' })
  @IsNotEmpty({ message: '设置名不能为空' })
  readonly key: string
}
