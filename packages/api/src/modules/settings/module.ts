import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SettingOption } from '@/settings/entity'
import { SettingsService } from '@/settings/service'
import { SettingsAdminController } from '@/settings/controller.admin'

import { SettingsListener } from '@/settings/listener'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SettingOption,
    ]),
  ],

  controllers: [
    SettingsAdminController,
  ],

  providers: [
    SettingsService,

    // Listener
    SettingsListener,
  ],

  exports: [
    SettingsService,
  ],
})
export class SettingsModule {}
