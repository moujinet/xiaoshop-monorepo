import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LogisticsCompany } from '@/logistics/company/entity'
import { LogisticsCompanyService } from '@/logistics/company/service'
import { LogisticsCompanyAdminController } from '@/logistics/company/controller.admin'

import { LogisticsFreightTemplate } from '@/logistics/template/entity'
import { LogisticsTemplateService } from '@/logistics/template/service'
import { LogisticsTemplateAdminController } from '@/logistics/template/controller.admin'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogisticsCompany,
      LogisticsFreightTemplate,
    ]),
  ],

  controllers: [
    LogisticsCompanyAdminController,
    LogisticsTemplateAdminController,
  ],

  providers: [
    LogisticsCompanyService,
    LogisticsTemplateService,
  ],

  exports: [
    LogisticsTemplateService,
    LogisticsCompanyService,
  ],
})
export class LogisticsModule {}
