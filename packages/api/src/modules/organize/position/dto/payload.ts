import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, NotEquals } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 创建/更新组织职位 DTO
 */
export class OrganizePositionPayload {
  @ApiProperty({ description: '所属部门 ID', default: 0 })
  @IsNumber({}, { message: '部门 ID 必须为数字' })
  @NotEquals(0, { message: '部门 ID 不能为 0' })
  readonly departmentId: number

  @ApiProperty({ description: '职位名称', example: example.name })
  @MaxLength(32, { message: '职位名称不能超过 32 个字符' })
  @IsNotEmpty({ message: '职位名称不能为空' })
  @IsString({ message: '职位名称必须为字符串' })
  readonly name: string

  @ApiProperty({ required: false, description: '职位描述', example: example.desc })
  @MaxLength(255, { message: '职位描述不能超过 255 个字符' })
  @IsString({ message: '职位描述必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '排序', default: 1 })
  @IsNumber({}, { message: '排序必须为数字' })
  @IsOptional()
  readonly sort: number
}
