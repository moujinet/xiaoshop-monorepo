import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { MemberPointsRuleService } from '@/member/points/service'
import {
  DeleteMemberPointsRuleRequest,
  GetMemberPointsRuleRequest,
  MemberPointsRulePayload,
  MemberPointsRuleResponse,
  UpdateMemberPointsRuleStatusPayload,
} from '@/member/points/dto'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse } from '~/common/response/decorators'

@ApiTags('会员积分规则')
@Controller('member/points/rule')
export class MemberPointsRuleController {
  constructor(
    private readonly pointsRule: MemberPointsRuleService,
  ) {}

  @ApiOperation({
    summary: '获取积分规则列表',
  })
  @ApiListedResponse(MemberPointsRuleResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list() {
    return this.pointsRule.findList()
  }

  @ApiOperation({
    summary: '获取积分规则详情',
  })
  @ApiObjectResponse(MemberPointsRuleResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '积分规则不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberPointsRuleRequest) {
    return this.pointsRule.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建积分规则',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '积分规则已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberPointsRulePayload) {
    return this.pointsRule.create(data)
  }

  @ApiOperation({
    summary: '更新积分规则',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '积分规则不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '积分规则已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetMemberPointsRuleRequest, @Body() data: MemberPointsRulePayload) {
    return this.pointsRule.update(+query.id, data)
  }

  @ApiOperation({
    summary: '更新积分规则状态',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '积分规则不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '积分规则已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('status/update')
  async updateStatus(@Query() query: GetMemberPointsRuleRequest, @Body() data: UpdateMemberPointsRuleStatusPayload) {
    return this.pointsRule.updateStatus(+query.id, data.status)
  }

  @ApiOperation({
    summary: '删除积分规则',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberPointsRuleRequest) {
    return this.pointsRule.delete(+data.id)
  }
}
