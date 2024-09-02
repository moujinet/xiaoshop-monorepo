import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '~/common/dto'

export class GetProductAdditionPagesRequest extends PaginationRequest {}

export class GetProductAdditionRequest {
  @ApiProperty({ description: '附加服务ID' })
  @IsNumberString({}, { message: '附加服务ID必须为数字' })
  @IsNotEmpty({ message: '附加服务ID不能为空' })
  readonly id: number
}

export class DeleteProductAdditionRequest {
  @ApiProperty({ description: '附加服务ID' })
  @IsNumber({}, { message: '附加服务ID必须为数字' })
  readonly id: number
}
