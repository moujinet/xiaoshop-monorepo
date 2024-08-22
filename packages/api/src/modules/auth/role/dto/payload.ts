import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { example } from './example'

/**
 * 创建员工角色 DTO
 */
export class AuthRolePayload {
  @ApiProperty({ description: '角色名称', example: example.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ required: false, description: '角色描述', example: example.desc })
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ type: [String], description: '角色权限', example: example.permissions })
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  readonly permissions: string[]

  @ApiProperty({ required: false, description: '排序', default: 1 })
  @IsNumber()
  @IsOptional()
  readonly sort: number
}
