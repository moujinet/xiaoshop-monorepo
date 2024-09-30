import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SystemSettingEntity } from './entity'
import { SystemSettingService } from './setting/service'
import { SystemSettingAdminService } from './admin/service'
import { SystemSettingController } from './setting/controller'
import { SystemSettingAdminController } from './admin/controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemSettingEntity,
    ]),
  ],

  controllers: [
    SystemSettingController,
    SystemSettingAdminController,
  ],

  providers: [
    SystemSettingService,
    SystemSettingAdminService,
  ],

  exports: [
    SystemSettingService,
    SystemSettingAdminService,
  ],
})
export class SystemSettingModule {}
