import { ApiProperty } from '@nestjs/swagger'

/**
 * 系统设置响应
 */
export class SettingOptionResponse {
  @ApiProperty({ description: '设置名', example: 'value' })
  key: string
}
