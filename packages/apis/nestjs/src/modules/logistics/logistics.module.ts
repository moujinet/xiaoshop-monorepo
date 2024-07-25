import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogisticsCompany } from '@/logistics/company/entity'
import { LogisticsCompanyService } from '@/logistics/company/service'
import { LogisticsCompanyController } from '@/logistics/company/controller'
import { LogisticsFreightTemplate } from '@/logistics/freight-template/entity'
import { LogisticsFreightTemplateService } from '@/logistics/freight-template/service'
import { LogisticsTemplateFreightController } from '@/logistics/freight-template/controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogisticsCompany,
      LogisticsFreightTemplate,
    ]),
  ],
  controllers: [
    LogisticsCompanyController,
    LogisticsTemplateFreightController,
  ],
  providers: [
    LogisticsCompanyService,
    LogisticsFreightTemplateService,
  ],
})
export class LogisticsModule {}
