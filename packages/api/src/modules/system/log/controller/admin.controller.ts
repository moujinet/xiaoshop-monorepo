import { Controller, Get, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { GetSystemLogPagesRequest } from '@/system/log/dto/request'
import { SystemLogQueryService } from '@/system/log/domain/query/service'

@Controller('admin/system/log')
export class SystemLogAdminController {
  constructor(
    private readonly service: SystemLogQueryService,
  ) {}

  /**
   * 获取系统日志列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemLogPagesRequest) {
    return this.service.findPages(query)
  }
}
