import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Put } from '@nestjs/common'
import {
  ApiDoneResponse,
  ApiFailedExceptionResponse,
  ApiNotFoundExceptionResponse,
} from '~/common/decorators'
import {
  BatchBindMemberCardPayload,
  BindMemberCardPayload,
} from '@/member/binding/dto'
import { MemberBindingService } from '@/member/binding/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/绑定会员卡')
@Controller('admin/member/bind')
export class MemberBindingAdminController {
  constructor(
    private readonly service: MemberBindingService,
  ) {}

  @ApiOperation({
    summary: '绑定会员卡',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiFailedExceptionResponse({ description: '绑定会员卡失败' })
  @ApiNotFoundExceptionResponse({ description: '会员卡不存在' })
  @ApiNotFoundExceptionResponse({ description: '会员卡有效期不存在' })
  @Put('card')
  async bind(@Body() data: BindMemberCardPayload) {
    return this.service.bindMemberCard(
      data.memberId,
      data.cardId,
      data.planId || null,
    )
  }

  @ApiOperation({
    summary: '批量绑定会员卡',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiFailedExceptionResponse({ description: '绑定会员卡失败' })
  @ApiNotFoundExceptionResponse({ description: '会员卡不存在' })
  @ApiNotFoundExceptionResponse({ description: '会员卡有效期不存在' })
  @Put('batch/card')
  async batchBind(@Body() data: BatchBindMemberCardPayload) {
    return this.service.batchBindMemberCard(
      data.memberIds,
      data.cardId,
      data.planId || null,
    )
  }
}
