import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { example } from './example'

/**
 * 商品附加服务 DTO
 */
export class GoodsAdditionPayload {
  @ApiProperty({ description: '服务名称', example: example.name })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: '服务介绍', example: example.desc })
  @MaxLength(200)
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '服务图标', example: example.icon })
  @IsString()
  @IsOptional()
  readonly icon: string

  @ApiProperty({ required: false, description: '服务价格', example: example.price })
  @IsNumber()
  @IsOptional()
  readonly price: number

  @ApiProperty({ required: false, description: '排序', example: example.sort })
  @IsNumber()
  @IsOptional()
  readonly sort: number
}
