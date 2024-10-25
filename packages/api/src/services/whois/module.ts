import { Module } from '@nestjs/common'

import { WhoisService } from './service'

@Module({
  providers: [
    WhoisService,
  ],

  exports: [
    WhoisService,
  ],
})
export class WhoisModule {}
