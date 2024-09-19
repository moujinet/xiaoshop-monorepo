import { Controller, Get, Inject, Param } from '@nestjs/common'

import { Public } from '@/system/auth/decorators'

import { SystemDictService } from './service'

@Controller('system/dict')
export class SystemDictController {
  constructor(
    @Inject(SystemDictService)
    private readonly service: SystemDictService,
  ) {}

  /**
   * 获取系统字典列表
   */
  @Get(':name')
  @Public()
  async mapping(@Param('name') name: string) {
    return this.service.findDictList(name)
  }
}
