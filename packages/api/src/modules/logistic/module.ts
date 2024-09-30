import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

import { LogisticAddressEntity } from './address/entity'
import { LogisticExpressEntity } from './express/entity'
import { LogisticAddressAdminService } from './address/admin/service'
import { LogisticExpressAdminService } from './express/admin/service'
import { LogisticFreightTemplateEntity } from './freight-template/entity'
import { LogisticAddressAdminController } from './address/admin/controller'
import { LogisticExpressAdminController } from './express/admin/controller'
import { LogisticFreightTemplateAdminService } from './freight-template/admin/service'
import { LogisticFreightTemplateAdminController } from './freight-template/admin/controller'

@Module({
  imports: [
    forwardRef(() => SystemSettingModule),

    TypeOrmModule.forFeature([
      LogisticAddressEntity,
      LogisticExpressEntity,
      LogisticFreightTemplateEntity,
    ]),
  ],

  controllers: [
    LogisticAddressAdminController,
    LogisticExpressAdminController,
    LogisticFreightTemplateAdminController,
  ],

  providers: [
    LogisticAddressAdminService,
    LogisticExpressAdminService,
    LogisticFreightTemplateAdminService,
  ],
})
export class LogisticModule {}
