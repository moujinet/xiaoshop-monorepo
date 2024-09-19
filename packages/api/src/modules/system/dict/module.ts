import { Module } from '@nestjs/common'

import { SystemDictService } from './service'
import { SystemDictController } from './controller'

@Module({
  controllers: [
    SystemDictController,
  ],

  providers: [
    SystemDictService,
  ],
})
export class SystemDictModule {}
