import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SystemMonitorCron } from './cron/entity'
import { SystemMonitorListener } from './listener'
import { SystemMonitorCronService } from './cron/service'
import { SystemMonitorCronAdminController } from './cron/controller.admin'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemMonitorCron,
    ]),
  ],

  controllers: [
    SystemMonitorCronAdminController,
  ],

  providers: [
    SystemMonitorCronService,

    // Listener
    SystemMonitorListener,
  ],
})
export class SystemMonitorModule {}
