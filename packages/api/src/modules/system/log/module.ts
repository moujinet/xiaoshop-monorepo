import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { WhoisService } from '~/services/whois'
import { SystemSettingModule } from '@/system/setting/module'

import { SystemLogEntity } from './entity'
import { SystemLogService } from './service'
import { SystemLogListener } from './listener'
import { SystemLogScheduler } from './scheduler'
import { SystemLogAdminController } from './controller.admin'

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
    SystemLogService,
    SystemLogListener,
    SystemLogScheduler,
  ],
})
export class SystemLogModule {}
