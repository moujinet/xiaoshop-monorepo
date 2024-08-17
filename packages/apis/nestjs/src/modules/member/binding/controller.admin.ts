import { Body, Controller, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MemberCardBindingService } from '@/member/binding/service'
import { EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse } from '~/common/response/decorators'
import { BatchBindMemberCardPayload, BindMemberCardPayload } from '@/member/binding/dto'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/绑定会员卡')
@Controller('admin/member/card')
export class MemberCardBindingAdminController {
  constructor(
    private readonly service: MemberCardBindingService,
  ) {}

  @ApiOperation({
    summary: '绑定「会员卡」',
  })
  @Admin()
  @ApiBearerAuth()
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
  @Admin()
  @ApiBearerAuth()
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
