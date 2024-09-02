import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '~/common/dto'

export class GetProductCommitmentPagesRequest extends PaginationRequest {}

export class GetProductCommitmentRequest {
  @ApiProperty({ description: '服务承诺ID' })
  @IsNumberString({}, { message: '服务承诺ID必须为数字' })
  @IsNotEmpty({ message: '服务承诺ID不能为空' })
  readonly id: number
}

export class DeleteProductCommitmentRequest {
  @ApiProperty({ description: '服务承诺ID' })
  @IsNumber({}, { message: '服务承诺ID必须为数字' })
  readonly id: number
}
