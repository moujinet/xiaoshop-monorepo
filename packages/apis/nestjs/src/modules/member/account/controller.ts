import { MemberAccountKey } from '@xiaoshop/schema'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { MemberAccountService } from '@/member/account/service'
import { GetMemberIdRequest, MemberAccountResponse } from '@/member/account/dto'
import { EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiObjectResponse } from '~/common/response/decorators'

@ApiTags('会员/账户')
@Controller('member/account')
export class MemberAccountController {
  constructor(
    private readonly service: MemberAccountService,
  ) {}

  @ApiOperation({
    summary: '获取「会员」账户',
  })
  @ApiObjectResponse(MemberAccountResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员账户失败' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员' })
  @Get()
  async account(@Query() query: GetMemberIdRequest) {
    return this.service.findMemberAccount(+query.id)
  }

  @ApiOperation({
    summary: '更新「会员」积分账户',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新会员账户失败' })
  @Put('points/update')
  async updatePointsAccount(
    @Query() query: GetMemberIdRequest,
    @Body('points') points: number,
  ) {
    return this.service.updateMemberAccount(
      +query.id,
      MemberAccountKey.POINTS,
      points,
    )
  }
}
