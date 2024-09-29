import { Body, Controller, ParseArrayPipe, Put } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemSettingAdminService } from './service'
import { UpdateSystemSettingPayload } from './dto/payload'

@Controller('admin/system/settings')
export class SystemSettingAdminController {
  constructor(
    private readonly service: SystemSettingAdminService,
  ) {}

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
