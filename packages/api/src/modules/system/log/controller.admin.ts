import { Controller, Get, Inject, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemLogService } from './service'
import { GetSystemLogPagesRequest } from './dto'

@Controller('admin/system/log')
export class SystemLogAdminController {
  constructor(
    @Inject(SystemLogService)
    private readonly service: SystemLogService,
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
