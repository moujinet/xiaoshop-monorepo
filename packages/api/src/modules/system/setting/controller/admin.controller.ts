import { Body, Controller, Get, ParseArrayPipe, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'

import { GetSystemSettingRequest } from '../dto/request'
import { UpdateSystemSettingPayload } from '../dto/payload'
import { SystemSettingReadService } from '../domain/read/service'
import { SystemSettingUpdateService } from '../domain/update/service'

@Controller('admin/system/settings')
export class SystemSettingAdminController {
  constructor(
    private readonly setting: SystemSettingReadService,
    private readonly service: SystemSettingUpdateService,
  ) {}

  /**
   * 获取所有系统设置
   */
  @Get()
  @Admin()
  async all() {
    return await this.setting.findAll()
  }

  /**
   * 获取指定系统设置
   */
  @Get('options')
  @Admin()
  async find(@Query() query: GetSystemSettingRequest) {
    return await this.setting.find(query.key)
  }

  /**
   * 更新系统设置
   */
  @Put('update')
  @Admin()
  async update(
    @Body(new ParseArrayPipe({ items: UpdateSystemSettingPayload }))
    payload: UpdateSystemSettingPayload[],
  ) {
    return this.service.update(payload)
  }
}
