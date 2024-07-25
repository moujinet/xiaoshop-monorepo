import type { ISettingsOption } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

/**
 * 创建设置项 DTO
 */
export class SettingsOptionPayload implements ISettingsOption {
  @ApiProperty({ description: '设置项键名' })
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  readonly key: string

  @ApiProperty({ description: '设置项键值' })
  @MaxLength(65535)
  @IsString()
  readonly value: string
}
