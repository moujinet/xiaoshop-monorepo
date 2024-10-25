import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { WhoisModule } from '~/services/whois/module'
import { SystemSettingModule } from '@/system/setting/module'
import { ExcelExporterModule } from '~/services/excel-exporter/module'

import { SystemLogEntity } from './model/entity'
import { SystemLogQueryService } from './domain/query/service'
import { SystemLogStoreService } from './domain/store/service'
import { SystemLogRepositoryProvider } from './model/provider'
import { SystemLogCleanupService } from './domain/cleanup/service'
import { SystemLogAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemLogEntity,
    ]),

    forwardRef(() => SystemSettingModule),
    forwardRef(() => ExcelExporterModule),
    forwardRef(() => WhoisModule),
  ],

  controllers: [
    SystemLogAdminController,
  ],

  providers: [
    SystemLogRepositoryProvider,
    SystemLogQueryService,
    SystemLogStoreService,
    SystemLogCleanupService,
  ],
})
export class SystemLogModule {}
