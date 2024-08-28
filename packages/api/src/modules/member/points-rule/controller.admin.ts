import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MemberPointsRuleService } from '@/member/points-rule/service'
import {
  GetMemberPointsRuleRequest,
  MemberPointsRuleResponse,
  UpdateMemberPointsRuleOptionsPayload,
  UpdateMemberPointsRuleStatusPayload,
} from '@/member/points-rule/dto'
import {
  ApiDoneResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/积分规则')
@Controller('admin/member/points-rule')
export class MemberPointsRuleAdminController {
  constructor(
    private readonly service: MemberPointsRuleService,
  ) {}

  @ApiOperation({
    summary: '获取积分规则列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(MemberPointsRuleResponse)
  @ApiFailedExceptionResponse({ description: '获取积分规则列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取积分规则详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(MemberPointsRuleResponse)
  @ApiFailedExceptionResponse({ description: '获取积分规则失败' })
  @ApiNotFoundExceptionResponse({ description: '积分规则不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberPointsRuleRequest) {
    return this.service.findByKey(query.key)
  }

  @ApiOperation({
    summary: '更新会员积分规则配置',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新会员积分规则失败' })
  @ApiNotFoundExceptionResponse({ description: '积分规则不存在' })
  @Put('options/update')
  async updateOptions(@Body() data: UpdateMemberPointsRuleOptionsPayload) {
    return this.service.updateByKey(data.key, data.options)
  }

  @ApiOperation({
    summary: '更新会员积分规则状态',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新会员积分规则失败' })
  @ApiNotFoundExceptionResponse({ description: '积分规则不存在' })
  @Put('status/update')
  async updateStatus(@Body() data: UpdateMemberPointsRuleStatusPayload) {
    return this.service.updateStatus(data.key, data.enable)
  }
}
