import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SystemSettingEntity } from './model/entity'
import { SystemSettingReadService } from './domain/read/service'
import { SystemSettingRepositoryProvider } from './model/provider'
import { SystemSettingUpdateService } from './domain/update/service'
import { SystemSettingShopController } from './controller/shop.controller'
import { SystemSettingAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemSettingEntity,
    ]),
  ],

  controllers: [
    SystemSettingShopController,
    SystemSettingAdminController,
  ],

  providers: [
    SystemSettingRepositoryProvider,
    SystemSettingReadService,
    SystemSettingUpdateService,
  ],

  exports: [
    SystemSettingReadService,
  ],
})
export class SystemSettingModule {}
