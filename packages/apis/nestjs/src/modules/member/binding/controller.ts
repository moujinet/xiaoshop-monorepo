import { Body, Controller, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { MemberCardBindingService } from '@/member/binding/service'
import { EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse } from '~/common/response/decorators'
import { BatchBindMemberCardPayload, BindMemberCardPayload } from '@/member/binding/dto'

@ApiTags('会员/绑定会员卡')
@Controller('member/card')
export class MemberCardBindingController {
  constructor(
    private readonly service: MemberCardBindingService,
  ) {}

  @ApiOperation({
    summary: '绑定「会员卡」',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员卡不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员卡有效期不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '绑定会员卡失败' })
  @Put('bind')
  async bind(@Body() data: BindMemberCardPayload) {
    return this.service.bindMemberCard(
      data.memberId,
      data.cardId,
      data.planId || null,
    )
  }

  @ApiOperation({
    summary: '批量绑定「会员卡」',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员卡不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员卡有效期不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '批量绑定会员卡失败' })
  @Put('batch/bind')
  async batchBind(@Body() data: BatchBindMemberCardPayload) {
    return this.service.batchBindMemberCard(
      data.memberIds,
      data.cardId,
      data.planId || null,
    )
  }
}
