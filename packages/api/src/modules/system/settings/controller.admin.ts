import { Body, Controller, Get, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemSettingsService } from './service'
import { BatchUpdateSystemSettingsPayload, GetSystemSettingsRequest } from './dto'

@Controller('admin/system/settings')
export class SystemSettingsAdminController {
  constructor(
    private readonly service: SystemSettingsService,
  ) {}

  /**
   * 获取所有系统设置
   */
  @Get('list')
  @Admin()
  async list() {
    return this.service.findAll()
  }

  /**
   * 获取指定系统设置
   *
   * @param query 设置键
   */
  @Get('option')
  @Admin()
  async option(@Query() query: GetSystemSettingsRequest) {
    return this.service.findByKey(query.key)
  }

  /**
   * 批量更新系统设置
   *
   * @param payload 设置项
   */
  @Put('update')
  @Admin()
  async update(@Body() payload: BatchUpdateSystemSettingsPayload) {
    return this.service.update(payload.settings)
  }
}
