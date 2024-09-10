import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 创建/更新组织部门 DTO
 */
export class OrganizeDepartmentPayload {
  @ApiProperty({ required: false, description: '上级部门 ID', default: 0 })
  @IsNumber({}, { message: '上级部门 ID 必须为数字' })
  @IsOptional()
  readonly parentId: number

  @ApiProperty({ description: '部门名称', example: example.name })
  @MaxLength(32, { message: '部门名称长度不能超过 32 个字符' })
  @IsNotEmpty({ message: '部门名称不能为空' })
  @IsString({ message: '部门名称必须为字符串' })
  readonly name: string

  @ApiProperty({ required: false, description: '部门描述', example: example.desc })
  @MaxLength(255, { message: '部门描述长度不能超过 255 个字符' })
  @IsString({ message: '部门描述必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '排序', default: 1 })
  @IsNumber({}, { message: '排序必须为数字' })
  @IsOptional()
  readonly sort: number
}
