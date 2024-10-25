import { Body, Controller, Get, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { UpsertNotificationSubscriberPayload } from '@/notification/subscriber/dto/payload'
import { GetNotificationSubscriberListRequest } from '@/notification/subscriber/dto/request'
import { NotificationSellerSubscriberService } from '@/notification/subscriber/domain/seller/service'

@Controller('admin/notification/subscriber')
export class NotificationSubscriberAdminController {
  constructor(
    private readonly service: NotificationSellerSubscriberService,
  ) {}

  /**
   * Get Notification Seller Subscriber Dict List
   */
  @Get('list')
  @Admin()
  async dictList(@Query() query: GetNotificationSubscriberListRequest) {
    return this.service.findDictList(+query.messageId)
  }

  /**
   * Update Notification Seller Subscriber
   */
  @Put('update')
  @Admin()
  async update(
    @Body() payload: UpsertNotificationSubscriberPayload,
  ) {
    return this.service.update(payload)
  }
}
