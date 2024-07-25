import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

/**
 * 删除设置项请求 DTO
 */
export class DeleteSettingsOptionRequest {
  @ApiProperty({ description: '设置项主键' })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly keys: string[]
}
