import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LogisticFreightTemplateEntity } from './model/entity'
import { LogisticFreightTemplateService } from './domain/template/service'
import { LogisticFreightTemplateRepositoryProvider } from './model/provider'
import { LogisticFreightTemplateAdminController } from './controller/template/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogisticFreightTemplateEntity,
    ]),
  ],

  controllers: [
    LogisticFreightTemplateAdminController,
  ],

  providers: [
    LogisticFreightTemplateRepositoryProvider,
    LogisticFreightTemplateService,
  ],

  exports: [],
})
export class LogisticFreightModule {}
