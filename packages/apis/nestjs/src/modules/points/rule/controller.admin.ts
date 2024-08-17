import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { PointsRuleService } from '@/points/rule/service'
import { Admin } from '@/auth/decorators'
import {
  GetPointsRuleRequest,
  PointsRuleListResponse,
  PointsRuleResponse,
  UpdatePointsRuleOptionsPayload,
  UpdatePointsRuleStatusPayload,
} from '@/points/rule/dto'
import {
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
  ApiObjectResponse,
} from '~/common/response/decorators'

@ApiTags('管理/会员积分/积分规则')
@Controller('admin/points/rule')
export class PointsRuleAdminController {
  constructor(
    private readonly service: PointsRuleService,
  ) {}

  @ApiOperation({
    summary: '获取「积分规则」列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(PointsRuleListResponse)
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
  @ApiObjectResponse(PointsRuleResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员积分规则详情失败' })
  @Get('detail')
  async detail(@Query() query: GetPointsRuleRequest) {
    return this.service.findByKey(query.key)
  }

  @ApiOperation({
    summary: '更新「积分规则」状态',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员积分规则」不存在' })
  @Put('status/update')
  async updateStatus(
    @Body() data: UpdatePointsRuleStatusPayload,
  ) {
    return this.service.updateStatus(data.key, data.enable)
  }

  @ApiOperation({
    summary: '更新「积分规则」设置',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员积分规则」不存在' })
  @Put('options/update')
  async updateOptions(
    @Body() data: UpdatePointsRuleOptionsPayload,
  ) {
    return this.service.updateOptions(data.key, data.options)
  }
}
