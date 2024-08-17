import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PointsChangeService } from '@/points/change/service'
import { Admin } from '@/auth/decorators'
import {
  GetMemberPointsChangeLogPagesRequest,
  PointsChangeLogListResponse,
  PointsChangePayload,
} from '@/points/change/dto'
import {
  ApiExceptionResponse,
  ApiPaginatedResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'

@ApiTags('管理/会员积分')
@Controller('admin/points')
export class PointsChangeAdminController {
  constructor(
    private readonly service: PointsChangeService,
  ) {}

  @ApiOperation({
    summary: '获取「会员积分」变更日志分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(PointsChangeLogListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员积分变更日志分页列表失败' })
  @Get('change/log/pages')
  async pages(@Query() query: GetMemberPointsChangeLogPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '变更「会员积分」',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员账户' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员账户失败' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新会员积分失败' })
  @Put('change')
  async update(@Body() data: PointsChangePayload) {
    return this.service.updatePoints(data.type, data.memberId, data.change, data.reason)
  }
}
