import { Controller, Get, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemLogAdminService } from './service'
import { GetSystemLogPagesRequest } from './dto/request'

@Controller('admin/system/log')
export class SystemLogAdminController {
  constructor(
    private readonly service: SystemLogAdminService,
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
