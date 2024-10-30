import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

import { MemberUnregisterEntity } from './model/entity'
import { MemberUnregisterRepositoryProvider } from './model/provider'
import { MemberUnregisterAuditService } from './domain/audit/service'
import { MemberUnregisterAuditController } from './controller/audit/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberUnregisterEntity,
    ]),

    forwardRef(() => SystemSettingModule),
  ],

  controllers: [
    MemberUnregisterAuditController,
  ],

  providers: [
    MemberUnregisterRepositoryProvider,
    MemberUnregisterAuditService,
  ],
})
export class MemberUnregisterModule {}
