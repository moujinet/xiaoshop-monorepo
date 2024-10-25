import { YesOrNo } from '@xiaoshop/shared'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { NotificationMessageService } from '@/notification/message/domain/manage/service'
import {
  CreateNotificationMessagePayload,
  UpdateNotificationMessagePayload,
} from '@/notification/message/dto/payload'
import {
  DeleteNotificationMessageRequest,
  GetNotificationMessageListRequest,
  GetNotificationMessageRequest,
} from '@/notification/message/dto/request'

@Controller('admin/notification/message')
export class NotificationMessageAdminController {
  constructor(
    private readonly service: NotificationMessageService,
  ) {}

  /**
   * Get Notification Message Pages
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetNotificationMessageListRequest) {
    return this.service.findList(query)
  }

  /**
   * Get Notification Message Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetNotificationMessageRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Notification Message
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateNotificationMessagePayload) {
    return this.service.create(payload)
  }

  /**
   * Update Notification Message
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetNotificationMessageRequest,
    @Body() payload: UpdateNotificationMessagePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Enable Notification Message
   */
  @Put('enable')
  @Admin()
  async enable(@Query() query: GetNotificationMessageRequest) {
    return this.service.updateStatus(+query.id, YesOrNo.YES)
  }

  /**
   * Disable Notification Message
   */
  @Put('disable')
  @Admin()
  async disable(@Query() query: GetNotificationMessageRequest) {
    return this.service.updateStatus(+query.id, YesOrNo.NO)
  }

  /**
   * Delete Notification Message
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteNotificationMessageRequest) {
    return this.service.delete(data.id)
  }
}
