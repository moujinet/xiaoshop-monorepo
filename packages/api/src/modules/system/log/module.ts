import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { WhoisService } from '~/services/whois'
import { SystemSettingModule } from '@/system/setting/module'

import { SystemLogEntity } from './entity'
import { SystemLogListener } from './listener'
import { SystemLogScheduler } from './scheduler'
import { SystemLogAdminService } from './admin/service'
import { SystemLogAdminController } from './admin/controller'

@Module({
  imports: [
    forwardRef(() => SystemSettingModule),

    TypeOrmModule.forFeature([
      SystemLogEntity,
    ]),
  ],

  controllers: [
    SystemLogAdminController,
  ],

  providers: [
    WhoisService,

    SystemLogAdminService,
    SystemLogListener,
    SystemLogScheduler,
  ],
})
export class SystemLogModule {}
