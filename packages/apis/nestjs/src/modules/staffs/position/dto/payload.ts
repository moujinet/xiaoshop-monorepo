import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { example } from './example'

/**
 * 创建组织职位 DTO
 */
export class PositionPayload {
  @ApiProperty({ description: '所属部门 ID', default: 0 })
  @IsNumber()
  readonly departmentId: number

  @ApiProperty({ description: '职位名称', example: example.name })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: '职位描述', example: example.desc })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '排序', default: 1 })
  @IsNumber()
  @IsOptional()
  readonly sort: number
}
