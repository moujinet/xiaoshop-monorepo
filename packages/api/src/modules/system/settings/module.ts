import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SystemSettings } from './entity'
import { SystemSettingsService } from './service'
import { SystemSettingsListener } from './listener'
import { SystemSettingsAdminController } from './controller.admin'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemSettings,
    ]),
  ],

  controllers: [
    SystemSettingsAdminController,
  ],

  providers: [
    SystemSettingsService,
    SystemSettingsListener,
  ],

  exports: [
    SystemSettingsService,
  ],
})
export class SystemSettingsModule {}
