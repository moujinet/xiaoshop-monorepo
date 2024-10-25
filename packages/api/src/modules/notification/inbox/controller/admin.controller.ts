import { ClsService } from 'nestjs-cls'
import { type ISystemLoginSignData, NotificationType } from '@xiaoshop/shared'
import { Body, Controller, Delete, Get, Inject, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { REQUEST_ADMIN_KEY } from '~/common/constants'
import { UnauthorizedException } from '~/common/exceptions'
import { NotificationInboxManageService } from '@/notification/inbox/domain/manage/service'
import { GetNotificationInboxPagesRequest, GetNotificationOnPost, GetNotificationRequest } from '@/notification/inbox/dto/request'

@Controller('admin/notification/inbox')
export class NotificationInboxAdminController {
  constructor(
    private readonly service: NotificationInboxManageService,

    @Inject(ClsService)
    private readonly cls: ClsService,
  ) {}

  /**
   * Get Notification Inbox Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetNotificationInboxPagesRequest) {
    const user = this.getCurrentUser()

    return this.service.findPages(
      {
        receiverId: user.id,
        type: NotificationType.SELLER,
      },
      query,
    )
  }

  /**
   * Get Notification Inbox Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetNotificationRequest) {
    const user = this.getCurrentUser()

    return this.service.read(+query.id, {
      receiverId: user.id,
      type: NotificationType.SELLER,
    })
  }

  /**
   * Mark Notification Inbox As Read
   */
  @Put('mark_as_read')
  @Admin()
  async markAsRead(@Body() data: GetNotificationOnPost) {
    const user = this.getCurrentUser()

    return this.service.markAsRead(data.ids, {
      receiverId: user.id,
      type: NotificationType.SELLER,
    })
  }

  /**
   * Delete Notification Inbox
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: GetNotificationOnPost) {
    const user = this.getCurrentUser()

    return this.service.delete(data.ids, {
      receiverId: user.id,
      type: NotificationType.SELLER,
    })
  }

  /**
   * Get Current Login User
   *
   * @returns Current User
   */
  getCurrentUser(): ISystemLoginSignData['user'] {
    const user = this.cls.get<ISystemLoginSignData['user']>(REQUEST_ADMIN_KEY)

    if (!user)
      throw new UnauthorizedException('请求未授权或已失效')

    return user
  }
}
