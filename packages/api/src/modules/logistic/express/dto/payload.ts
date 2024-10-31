import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

/**
 * Create Logistic Express
 */
export class CreateLogisticExpressPayload {
  @IsString({ message: '公司名称不正确' })
  @IsNotEmpty({ message: '公司名称不能为空' })
  readonly name: string

  @IsString({ message: '公司介绍不正确' })
  @IsOptional()
  readonly desc?: string

  @IsString({ message: '公司 LOGO 不正确' })
  @IsOptional()
  readonly logo?: string

  @IsString({ message: '公司官网不正确' })
  @IsOptional()
  readonly url?: string

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number
}

/**
 * Update Logistic Express
 */
export class UpdateLogisticExpressPayload extends CreateLogisticExpressPayload {
}
