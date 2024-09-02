import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class ProductAdditionPayload {
  @ApiProperty({ description: '附加服务名称' })
  @IsString({ message: '附加服务名称必须为字符串' })
  @IsNotEmpty({ message: '附加服务名称不能为空' })
  readonly name: string

  @ApiProperty({ required: false, description: '附加服务图标' })
  @IsString({ message: '附加服务图标必须为字符串' })
  @IsOptional()
  readonly icon: string

  @ApiProperty({ required: false, description: '附加服务介绍' })
  @IsString({ message: '附加服务介绍必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '附加服务价格' })
  @IsNumber({}, { message: '附加服务价格必须为数字' })
  @Min(0, { message: '附加服务价格不能小于0' })
  @IsOptional()
  readonly price: number

  @ApiProperty({ required: false, description: '排序' })
  @IsNumber({}, { message: '排序必须为数字' })
  @Min(0, { message: '排序不能小于0' })
  @IsOptional()
  readonly sort: number
}
