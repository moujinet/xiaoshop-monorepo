import type { ILocation } from '@xiaoshop/shared'

import { IsNotEmpty, IsString } from 'class-validator'

/**
 * 地区 DTO
 */
export class Location implements ILocation {
  /**
   * 地区编码
   */
  @IsString({ message: '地区编码必须为字符串' })
  @IsNotEmpty({ message: '地区编码不能为空' })
  readonly code: string

  /**
   * 地区名称
   */
  @IsString({ message: '地区名称必须为字符串' })
  @IsNotEmpty({ message: '地区名称不能为空' })
  readonly name: string
}
