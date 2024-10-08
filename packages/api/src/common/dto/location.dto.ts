import type { ILocation } from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

/**
 * 地区 DTO
 */
export class Location implements ILocation {
  /**
   * 地区编码
   */
  @ApiProperty({ description: '地区编码', default: '11' })
  @IsString({ message: '地区编码必须为字符串' })
  @IsNotEmpty({ message: '地区编码不能为空' })
  readonly code: string

  /**
   * 地区名称
   */
  @ApiProperty({ description: '地区名称', default: '北京市' })
  @IsString({ message: '地区名称必须为字符串' })
  @IsNotEmpty({ message: '地区名称不能为空' })
  readonly name: string
}
