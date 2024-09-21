import { Controller, Get, Inject, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemMonitorCronService } from './service'
import { GetSystemMonitorCronPagesRequest } from './dto'

@Controller('admin/system/monitor/cron')
export class SystemMonitorCronAdminController {
  constructor(
    @Inject(SystemMonitorCronService)
    private readonly service: SystemMonitorCronService,
  ) {}

  /**
   * 获取定时任务执行结果列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemMonitorCronPagesRequest) {
    return this.service.findPages(query)
  }
}
