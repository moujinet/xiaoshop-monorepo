import { ClsService } from 'nestjs-cls'
import { Body, Controller, Delete, Get, Inject, Put, Query } from '@nestjs/common'
import { type ISystemLoginSignData, SystemNotificationType } from '@xiaoshop/shared'

import { Admin } from '@/system/auth/decorators'

import { SystemNotificationAdminService } from './service'
import {
  DeleteSystemNotificationRequest,
  GetSystemNotificationInfoRequest,
  GetSystemNotificationListRequest,
  GetSystemNotificationPagesRequest,
} from './dto/request'

@Controller('admin/system/notification')
export class SystemNotificationAdminController {
  constructor(
    private readonly service: SystemNotificationAdminService,

    @Inject(ClsService)
    private readonly cls: ClsService,
  ) {}

  /**
   * 获取系统通知分页列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemNotificationPagesRequest) {
    return this.service.findPages(
      this.getUserId(),
      SystemNotificationType.SELLER,
      query,
    )
  }

  /**
   * 获取系统通知列表
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetSystemNotificationListRequest) {
    return this.service.findList(
      this.getUserId(),
      SystemNotificationType.SELLER,
      query,
    )
  }

  /**
   * 获取系统通知信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemNotificationInfoRequest) {
    return this.service.read(
      +query.id,
      this.getUserId(),
      SystemNotificationType.SELLER,
    )
  }

  /**
   * 标记为已读
   */
  @Put('mark_as_read')
  @Admin()
  async markAsRead(@Body() data: DeleteSystemNotificationRequest) {
    return this.service.markAsRead(
      data.ids,
      this.getUserId(),
      SystemNotificationType.SELLER,
    )
  }

  /**
   * 删除系统通知
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteSystemNotificationRequest) {
    return this.service.delete(
      data.ids,
      this.getUserId(),
      SystemNotificationType.SELLER,
    )
  }

  /**
   * 清空系统通知
   */
  @Delete('clean')
  @Admin()
  async deleteAll() {
    return this.service.deleteAll(
      this.getUserId(),
      SystemNotificationType.SELLER,
    )
  }

  /**
   * 获取当前登录用户 ID
   *
   * @returns 当前登录用户 ID
   */
  getUserId(): number {
    const user = this.cls.get<ISystemLoginSignData['user']>('USER')
    return user.id
  }
}
