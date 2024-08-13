import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
  ApiObjectResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  GetMemberPointsRuleRequest,
  MemberPointsRuleListResponse,
  MemberPointsRuleResponse,
  UpdateMemberPointsRuleOptionsPayload,
  UpdateMemberPointsRuleStatusPayload,
} from '@/member/points-rule/dto'
import { MemberPointsRuleService } from '@/member/points-rule/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/积分规则')
@Controller('admin/member/points/rule')
export class MemberPointsRuleAdminController {
  constructor(
    private readonly service: MemberPointsRuleService,
  ) {}

  @ApiOperation({
    summary: '获取「积分规则」列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(MemberPointsRuleListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员积分规则列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取「积分规则」详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(MemberPointsRuleResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员积分规则详情失败' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('detail')
  async detail(@Query() query: GetMemberPointsRuleRequest) {
    return this.service.findDetail(query.key)
  }

  @ApiOperation({
    summary: '更新「积分规则」状态',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员积分规则」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('status/update')
  async updateStatus(
    @Body() data: UpdateMemberPointsRuleStatusPayload,
  ) {
    return this.service.updateStatus(data)
  }

  @ApiOperation({
    summary: '更新「积分规则」设置',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员积分规则」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('options/update')
  async updateOptions(
    @Body() data: UpdateMemberPointsRuleOptionsPayload,
  ) {
    return this.service.updateOptions(data)
  }
}
