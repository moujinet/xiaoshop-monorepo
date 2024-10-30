import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Member Tag Pages
 */
export class GetMemberTagPagesRequest extends PaginationDto {}

/**
 * Get Member Tag
 */
export class GetMemberTagRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Delete Member Tag
 */
export class DeleteMemberTagRequest {
  @IsNumber({}, { message: 'ID 不正确' })
  readonly id: number
}
