import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取会员群体请求 DTO
 */
export class GetMemberGroupRequest {
  @ApiProperty({ description: '会员群体 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除会员群体请求 DTO
 */
export class DeleteMemberGroupRequest {
  @ApiProperty({ description: '会员群体 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
