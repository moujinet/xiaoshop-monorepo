import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MemberCardEntity } from './model/card/entity'
import { MemberBindService } from './domain/bind/service'
import { MemberCardBindEntity } from './model/bind/entity'
import { MemberCardService } from './domain/manage/service'
import { MemberUpgradeService } from './domain/upgrade/service'
import { MemberLevelUpService } from './domain/levelup/service'
import { MemberCardUpgradeEntity } from './model/upgrade/entity'
import { MemberCardRepositoryProvider } from './model/card/provider'
import { MemberCardBindRepositoryProvider } from './model/bind/provider'
import { MemberCardUpgradeRepositoryProvider } from './model/upgrade/provider'
import { MemberCardAdminController } from './controller/manage/admin.controller'
import { MemberCardBindAdminController } from './controller/bind/admin.controller'
import { MemberCardLevelUpAdminController } from './controller/levelup/admin.controller'
import { MemberCardUpgradeAdminController } from './controller/upgrade/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberCardEntity,
      MemberCardBindEntity,
      MemberCardUpgradeEntity,
    ]),
  ],

  controllers: [
    MemberCardAdminController,
    MemberCardBindAdminController,
    MemberCardLevelUpAdminController,
    MemberCardUpgradeAdminController,
  ],

  providers: [
    MemberCardRepositoryProvider,
    MemberCardBindRepositoryProvider,
    MemberCardUpgradeRepositoryProvider,
    MemberCardService,
    MemberBindService,
    MemberLevelUpService,
    MemberUpgradeService,
  ],

  exports: [
    MemberCardRepositoryProvider,
    MemberBindService,
  ],
})
export class MemberCardModule {}
