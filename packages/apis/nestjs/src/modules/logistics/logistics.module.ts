import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LogisticsCompany } from '@/logistics/company/entity'
import { LogisticsCompanyService } from '@/logistics/company/service'
import { LogisticsCompanyAdminController } from '@/logistics/company/controller.admin'

import { LogisticsFreightTemplate } from '@/logistics/freight-template/entity'
import { LogisticsFreightTemplateService } from '@/logistics/freight-template/service'
import { LogisticsTemplateFreightAdminController } from '@/logistics/freight-template/controller.admin'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogisticsCompany,
      LogisticsFreightTemplate,
    ]),
  ],
  controllers: [
    // admin
    LogisticsCompanyAdminController,
    LogisticsTemplateFreightAdminController,
  ],
  providers: [
    LogisticsCompanyService,
    LogisticsFreightTemplateService,
  ],
})
export class LogisticsModule {}
