import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class ExpressPayload {
  @IsString({ message: '物流公司名称不正确' })
  @IsNotEmpty({ message: '物流公司名称不能为空' })
  readonly name: string

  @IsString({ message: '物流公司 LOGO 不正确' })
  @IsOptional()
  readonly logo?: string

  @IsString({ message: '物流公司介绍不正确' })
  @IsOptional()
  readonly desc?: string

  @IsUrl({}, { message: '物流公司 URL 不正确' })
  @IsOptional()
  readonly url?: string

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number
}
