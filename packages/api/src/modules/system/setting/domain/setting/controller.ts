import { Controller, Get, Query } from '@nestjs/common'

import { Admin, Public } from '@/system/auth/decorators'

import { SystemSettingService } from './service'
import { GetSystemSettingsRequest } from './dto/request'

@Controller('admin/system/settings')
export class SystemSettingController {
  constructor(
    private readonly service: SystemSettingService,
  ) {}

  /**
   * 获取所有系统设置
   */
  @Get()
  @Admin()
  async all() {
    return await this.service.findAll()
  }

  /**
   * 获取商铺设置
   */
  @Get('store')
  @Public()
  async store() {
    return await this.service.findByKey('store.*')
  }

  /**
   * 获取指定系统设置
   */
  @Get('options')
  @Public()
  async find(@Query() query: GetSystemSettingsRequest) {
    return await this.service.findByKey(query.key)
  }
}
