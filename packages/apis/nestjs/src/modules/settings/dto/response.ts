import type { ISettings } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 设置项响应 DTO
 */
export class SettingsOptionResponse implements ISettings {
  @ApiProperty({ description: '设置项 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '设置项键名', example: 'key' })
  readonly key: string

  @ApiProperty({ description: '设置项键值', example: 'value' })
  readonly value: string
}
