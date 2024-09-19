import { Controller, Get, Inject, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemMessageLogService } from './service'
import {
  GetSystemMessageLogInfoRequest,
  GetSystemMessageLogPagesRequest,
} from './dto'

@Controller('admin/system/message/log')
export class SystemMessageLogAdminController {
  constructor(
    @Inject(SystemMessageLogService)
    private readonly service: SystemMessageLogService,
  ) {}

  /**
   * 获取消息日志列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemMessageLogPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * 获取消息日志信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemMessageLogInfoRequest) {
    return this.service.findById(+query.id)
  }
}
