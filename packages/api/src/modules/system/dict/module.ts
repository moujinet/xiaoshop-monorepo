import { Module } from '@nestjs/common'

import { SystemDictQueryService } from './domain/query/service'
import { SystemDictQueryController } from './controller/query.controller'

@Module({
  controllers: [
    SystemDictQueryController,
  ],

  providers: [
    SystemDictQueryService,
  ],
})
export class SystemDictModule {}
