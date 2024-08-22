import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Query } from '@nestjs/common'
import { ApiFailedExceptionResponse, ApiPaginatedResponse } from '~/common/decorators'
import { AuthLogResponse, GetAuthLogPagesRequest } from '@/auth/log/dto'
import { AuthLogService } from '@/auth/log/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/权限/日志')
@Controller('admin/auth/log')
export class AuthLogAdminController {
  constructor(
    private readonly service: AuthLogService,
  ) {}

  @ApiOperation({
    summary: '获取员工日志分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(AuthLogResponse)
  @ApiFailedExceptionResponse({ description: '获取员工日志分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetAuthLogPagesRequest) {
    return this.service.findPages(query)
  }
}
