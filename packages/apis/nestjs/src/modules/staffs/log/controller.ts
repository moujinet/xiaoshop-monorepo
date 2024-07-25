import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Query } from '@nestjs/common'
import { EXCEPTION_FAILED } from '~/common/exception'
import { ApiExceptionResponse, ApiPaginatedResponse } from '~/common/response/decorators'
import { GetStaffLogPagesRequest, StaffLogResponse } from '@/staffs/log/dto'
import { StaffLogService } from '@/staffs/log/service'

@ApiTags('员工日志')
@Controller('staffs/log')
export class StaffLogController {
  constructor(
    private readonly service: StaffLogService,
  ) {}

  @ApiOperation({
    summary: '获取员工日志分页列表',
  })
  @ApiPaginatedResponse(StaffLogResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('pages')
  async pages(@Query() query: GetStaffLogPagesRequest) {
    return this.service.findPages(query)
  }
}
