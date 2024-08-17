import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Query } from '@nestjs/common'
import { EXCEPTION_FAILED } from '~/common/exception'
import { ApiExceptionResponse, ApiPaginatedResponse } from '~/common/response/decorators'
import { GetStaffLogPagesRequest, StaffLogResponse } from '@/staff/log/dto'
import { StaffLogService } from '@/staff/log/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/权限/员工日志')
@Controller('admin/staff/log')
export class StaffLogAdminController {
  constructor(
    private readonly service: StaffLogService,
  ) {}

  @ApiOperation({
    summary: '获取员工日志分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(StaffLogResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('pages')
  async pages(@Query() query: GetStaffLogPagesRequest) {
    return this.service.findPages(query)
  }
}
