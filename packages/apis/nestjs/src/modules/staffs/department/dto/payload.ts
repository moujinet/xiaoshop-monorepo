import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { example } from './example'

/**
 * 创建组织部门 DTO
 */
export class DepartmentPayload {
  @ApiProperty({ description: '上级部门 ID', default: 0 })
  @IsNumber()
  readonly parentId: number

  @ApiProperty({ description: '部门名称', example: example.name })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: '部门描述', example: example.desc })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '排序', default: 1 })
  @IsNumber()
  @IsOptional()
  readonly sort: number
}
