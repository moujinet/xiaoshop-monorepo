import { Controller, Get, Query } from '@nestjs/common'

import { GetSystemSettingRequest } from '../dto/request'
import { SystemSettingReadService } from '../domain/read/service'

@Controller('system/settings')
export class SystemSettingShopController {
  constructor(
    private readonly setting: SystemSettingReadService,
  ) {}

  /**
   * 获取所有系统设置
   */
  @Get()
  async all() {
    return await this.setting.findAll()
  }

  /**
   * 获取指定系统设置
   */
  @Get('options')
  async find(@Query() query: GetSystemSettingRequest) {
    return await this.setting.find(query.key)
  }
}
