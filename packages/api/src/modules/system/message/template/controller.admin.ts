import { YesOrNo } from '@xiaoshop/shared'
import { Body, Controller, Get, Inject, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemMessageTemplateService } from './service'
import {
  GetSystemMessageTemplateInfoRequest,
  GetSystemMessageTemplateListRequest,
  SystemMessageTemplatePayload,
} from './dto'

@Controller('admin/system/message/template')
export class SystemMessageTemplateAdminController {
  constructor(
    @Inject(SystemMessageTemplateService)
    private readonly service: SystemMessageTemplateService,
  ) {}

  /**
   * 获取消息模板列表
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetSystemMessageTemplateListRequest) {
    return this.service.findList(query)
  }

  /**
   * 获取消息模板信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemMessageTemplateInfoRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * 更新消息模板
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetSystemMessageTemplateInfoRequest,
    @Body() payload: SystemMessageTemplatePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * 启用消息模板
   */
  @Put('enable')
  @Admin()
  async enable(@Query() query: GetSystemMessageTemplateInfoRequest) {
    return this.service.updateStatus(+query.id, YesOrNo.YES)
  }

  /**
   * 停用消息模板
   */
  @Put('disable')
  @Admin()
  async disable(@Query() query: GetSystemMessageTemplateInfoRequest) {
    return this.service.updateStatus(+query.id, YesOrNo.NO)
  }
}
