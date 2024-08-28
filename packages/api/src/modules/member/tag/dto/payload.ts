import {
  ColorName,
  type IColorName,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { example } from './example'

/**
 * 创建会员标签 DTO
 */
export class MemberTagPayload {
  @ApiProperty({ description: '会员标签名称', example: example.name })
  @IsString({ message: '会员标签名称必须为字符串' })
  @IsNotEmpty({ message: '会员标签名称不能为空' })
  readonly name: string

  @ApiProperty({ description: '会员标签颜色', enum: ColorName, example: example.color })
  @IsEnum(ColorName, { message: '会员标签颜色必须为颜色值' })
  @IsNotEmpty({ message: '会员标签颜色不能为空' })
  readonly color: IColorName
}
