import { Controller, Get, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemNotificationLogAdminService } from './service'
import {
  GetSystemNotificationLogInfoRequest,
  GetSystemNotificationLogPagesRequest,
} from './dto/request'

@Controller('admin/system/notification/log')
export class SystemNotificationLogAdminController {
  constructor(
    private readonly service: SystemNotificationLogAdminService,
  ) {}

  /**
   * 获取通知发送日志列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemNotificationLogPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * 获取通知发送日志信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemNotificationLogInfoRequest) {
    return this.service.findById(+query.id)
  }
}
