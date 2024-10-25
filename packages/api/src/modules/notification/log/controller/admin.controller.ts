import { Controller, Get, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { NotificationLogQueryService } from '@/notification/log/domain/query/service'
import { GetNotificationLogPagesRequest, GetNotificationLogRequest } from '@/notification/log/dto/request'

@Controller('admin/notification/log')
export class NotificationLogAdminController {
  constructor(
    private readonly service: NotificationLogQueryService,
  ) {}

  /**
   * Get Notification Log Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetNotificationLogPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Notification Log Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetNotificationLogRequest) {
    return this.service.findById(+query.id)
  }
}
