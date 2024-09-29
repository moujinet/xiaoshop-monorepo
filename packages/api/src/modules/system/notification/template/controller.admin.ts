import { Body, Controller, Get, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemNotificationTemplateService } from './service'
import { SystemNotificationTemplatePayload } from './dto/payload'
import {
  GetSystemNotificationTemplateInfoRequest,
  GetSystemNotificationTemplateListRequest,
} from './dto/request'

@Controller('admin/system/notification/template')
export class SystemNotificationTemplateAdminController {
  constructor(
    private readonly service: SystemNotificationTemplateService,
  ) {}

  /**
   * 获取通知模板列表
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetSystemNotificationTemplateListRequest) {
    return this.service.findList(query)
  }

  /**
   * 获取通知模板信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemNotificationTemplateInfoRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * 更新通知模板
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetSystemNotificationTemplateInfoRequest,
    @Body() payload: SystemNotificationTemplatePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * 启用通知模板
   */
  @Put('enable')
  @Admin()
  async enable(@Query() query: GetSystemNotificationTemplateInfoRequest) {
    return this.service.enable(+query.id)
  }

  /**
   * 停用通知模板
   */
  @Put('disable')
  @Admin()
  async disable(@Query() query: GetSystemNotificationTemplateInfoRequest) {
    return this.service.disable(+query.id)
  }
}
