import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { WhoisService } from '~/services/whois'
import { SystemSettingsModule } from '@/system/settings/module'

import { SystemLog } from './entity'
import { SystemLogService } from './service'
import { SystemLogListener } from './listener'
import { SystemLogScheduler } from './scheduler'
import { SystemLogAdminController } from './controller.admin'

@Module({
  imports: [
    forwardRef(() => SystemSettingsModule),

    TypeOrmModule.forFeature([
      SystemLog,
    ]),
  ],

  controllers: [
    SystemLogAdminController,
  ],

  providers: [
    WhoisService,

    SystemLogService,

    // Listener
    SystemLogListener,

    // Scheduler
    SystemLogScheduler,
  ],

  exports: [
    SystemLogService,
  ],
})
export class SystemLogModule {}
