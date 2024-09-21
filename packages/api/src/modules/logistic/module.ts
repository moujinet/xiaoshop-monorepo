import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingsModule } from '@/system/settings/module'

import { LogisticExpress } from './express/entity'
import { LogisticExpressService } from './express/service'
import { LogisticFreightTemplate } from './freight-template/entity'
import { LogisticExpressAdminController } from './express/controller.admin'
import { LogisticFreightTemplateService } from './freight-template/service'
import { LogisticFreightTemplateAdminController } from './freight-template/controller.admin'

@Module({
  imports: [
    forwardRef(() => SystemSettingsModule),

    TypeOrmModule.forFeature([
      LogisticExpress,
      LogisticFreightTemplate,
    ]),
  ],

  controllers: [
    LogisticExpressAdminController,
    LogisticFreightTemplateAdminController,
  ],

  providers: [
    LogisticExpressService,
    LogisticFreightTemplateService,
  ],

  exports: [],
})
export class LogisticModule {}
