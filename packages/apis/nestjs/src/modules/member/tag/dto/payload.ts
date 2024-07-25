import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { example } from './example'

/**
 * 创建会员标签 DTO
 */
export class MemberTagPayload {
  @ApiProperty({ description: '会员标签名称', example: example.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string
}
