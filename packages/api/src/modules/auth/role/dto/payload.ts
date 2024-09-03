import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 创建员工角色 DTO
 */
export class AuthRolePayload {
  @ApiProperty({ description: '角色名称', example: example.name })
  @IsString({ message: '角色名称不正确' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  readonly name: string

  @ApiProperty({ required: false, description: '角色描述', example: example.desc })
  @IsString({ message: '角色描述不正确' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ type: [String], description: '角色权限', example: example.permissions })
  @IsString({ each: true, message: '角色权限不正确' })
  @IsArray({ message: '角色权限不正确' })
  @ArrayNotEmpty({ message: '角色权限不能为空' })
  readonly permissions: string[]

  @ApiProperty({ required: false, description: '排序', default: 1 })
  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort: number
}
