import { ApiProperty } from '@nestjs/swagger'
import { ColorName, IColorName } from '@xiaoshop/shared'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ProductTagPayload {
  @ApiProperty({ description: '商品标签名称' })
  @IsString({ message: '商品标签名称必须为字符串' })
  @IsNotEmpty({ message: '商品标签名称不能为空' })
  readonly name: string

  @ApiProperty({ required: false, description: '商品标签颜色', enum: ColorName })
  @IsEnum(ColorName, { message: '商品标签颜色不正确' })
  @IsOptional()
  readonly color: IColorName
}
