import { ClsService } from 'nestjs-cls'
import { Controller, Delete, Get, Inject, Put, Query } from '@nestjs/common'
import { type ISystemLoginSignData, SystemMessageType } from '@xiaoshop/shared'

import { Admin } from '@/system/auth/decorators'

import { SystemMessageService } from './service'
import {
  GetSystemMessageInfoRequest,
  GetSystemMessageListRequest,
  GetSystemMessagePagesRequest,
} from './dto'

@Controller('admin/system/message')
export class SystemMessageAdminController {
  constructor(
    @Inject(SystemMessageService)
    private readonly service: SystemMessageService,

    @Inject(ClsService)
    private readonly cls: ClsService,
  ) {}

  /**
   * 获取系统消息分页列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemMessagePagesRequest) {
    return this.service.findPages(this.getUserId(), query)
  }

  /**
   * 获取系统消息列表
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetSystemMessageListRequest) {
    return this.service.findList(this.getUserId(), query)
  }

  /**
   * 获取系统消息内容
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemMessageInfoRequest) {
    return this.service.read(
      +query.id,
      this.getUserId(),
      SystemMessageType.SELLER,
    )
  }

  /**
   * 获取未读消息数量
   */
  @Get('unread/count')
  @Admin()
  async countUnread() {
    return this.service.countUnread(
      this.getUserId(),
      SystemMessageType.SELLER,
    )
  }

  /**
   * 设置所有消息为已读
   */
  @Put('mark_as_read')
  @Admin()
  async markAllAsRead() {
    return this.service.markAllAsRead(
      this.getUserId(),
      SystemMessageType.SELLER,
    )
  }

  /**
   * 删除消息
   */
  @Delete('delete')
  @Admin()
  async delete(@Query() query: GetSystemMessageInfoRequest) {
    return this.service.delete(
      +query.id,
      this.getUserId(),
      SystemMessageType.SELLER,
    )
  }

  /**
   * 清空消息
   */
  @Delete('clean')
  @Admin()
  async deleteAll() {
    return this.service.deleteAll(
      this.getUserId(),
      SystemMessageType.SELLER,
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
