import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

/**
 * 更新系统设置载荷 DTO
 */
export class UpdateSettingsPayload {
  @ApiProperty({ description: '设置名', example: 'settings.key' })
  @IsString({ message: '设置名必须为字符串' })
  @IsNotEmpty({ message: '设置名不能为空' })
  readonly key: string

  @ApiProperty({ required: false, description: '设置值', example: 'settings.value' })
  @IsString({ message: '设置值必须为字符串' })
  @IsOptional()
  readonly value: string
}
