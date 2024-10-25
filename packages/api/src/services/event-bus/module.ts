import { Global, Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { EventBusEmitter } from './emitter'

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot({
      global: true,
      wildcard: true,
      verboseMemoryLeak: true,
    }),
  ],

  providers: [
    EventBusEmitter,
  ],

  exports: [
    EventBusEmitter,
  ],
})
export class EventBusModule {}
