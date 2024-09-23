import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingsModule } from '@/system/settings/module'

import { LogisticListener } from './listener'
import { LogisticExpress } from './express/entity'
import { LogisticAddress } from './address/entity'
import { LogisticExpressService } from './express/service'
import { LogisticAddressService } from './address/service'
import { LogisticFreightTemplate } from './freight-template/entity'
import { LogisticExpressAdminController } from './express/controller.admin'
import { LogisticFreightTemplateService } from './freight-template/service'
import { LogisticAddressAdminController } from './address/controller.admin'
import { LogisticFreightTemplateAdminController } from './freight-template/controller.admin'

@Module({
  imports: [
    forwardRef(() => SystemSettingsModule),

    TypeOrmModule.forFeature([
      LogisticAddress,
      LogisticExpress,
      LogisticFreightTemplate,
    ]),
  ],

  controllers: [
    LogisticAddressAdminController,
    LogisticExpressAdminController,
    LogisticFreightTemplateAdminController,
  ],

  providers: [
    LogisticAddressService,
    LogisticExpressService,
    LogisticFreightTemplateService,

    // Listener
    LogisticListener,
  ],

  exports: [],
})
export class LogisticModule {}
