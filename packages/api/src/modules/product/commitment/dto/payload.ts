import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class ProductCommitmentPayload {
  @ApiProperty({ description: '服务承诺名称' })
  @IsString({ message: '服务承诺名称必须为字符串' })
  @IsNotEmpty({ message: '服务承诺名称不能为空' })
  readonly name: string

  @ApiProperty({ required: false, description: '服务承诺图标' })
  @IsString({ message: '服务承诺图标必须为字符串' })
  @IsOptional()
  readonly icon: string

  @ApiProperty({ required: false, description: '服务承诺介绍' })
  @IsString({ message: '服务承诺介绍必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '排序' })
  @IsNumber({}, { message: '排序必须为数字' })
  @Min(0, { message: '排序不能小于0' })
  @IsOptional()
  readonly sort: number
}
