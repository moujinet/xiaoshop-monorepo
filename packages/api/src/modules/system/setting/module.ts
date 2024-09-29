import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SystemSettingEntity } from './entity'
import { SystemSettingService } from './domain/setting/service'
import { SystemSettingAdminService } from './domain/admin/service'
import { SystemSettingController } from './domain/setting/controller'
import { SystemSettingAdminController } from './domain/admin/controller'

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
  ],
})
export class SystemSettingModule {}
