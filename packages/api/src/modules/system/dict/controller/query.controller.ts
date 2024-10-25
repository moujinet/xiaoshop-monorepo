import { Controller, Get, Inject, Param } from '@nestjs/common'

import { Public } from '~/common/decorators'
import { SystemDictQueryService } from '@/system/dict/domain/query/service'

@Controller('system/dict')
export class SystemDictQueryController {
  constructor(
    @Inject(SystemDictQueryService)
    private readonly service: SystemDictQueryService,
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
