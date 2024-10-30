import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { MemberTagModule } from '@/member/tag/module'
import { MemberCardModule } from '@/member/card/module'
import { MemberPointsModule } from '@/member/points/module'
import { SystemSettingModule } from '@/system/setting/module'

import { MemberService } from './domain/manage/service'
import { MemberAccountEntity } from './model/account/entity'
import { MemberProfileEntity } from './model/profile/entity'
import { MemberPointsService } from './domain/points/service'
import { MemberStatisticsService } from './domain/statistics/service'
import { MemberAccountRepositoryProvider } from './model/account/provider'
import { MemberProfileRepositoryProvider } from './model/profile/provider'
import { MemberAdminController } from './controller/manage/admin.controller'
import { MemberPointsAdminController } from './controller/points/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberProfileEntity,
      MemberAccountEntity,
    ]),

    forwardRef(() => MemberCardModule),
    forwardRef(() => MemberTagModule),
    forwardRef(() => MemberPointsModule),
    forwardRef(() => SystemSettingModule),
  ],

  controllers: [
    MemberAdminController,
    MemberPointsAdminController,
  ],

  providers: [
    MemberProfileRepositoryProvider,
    MemberAccountRepositoryProvider,
    MemberService,
    MemberStatisticsService,
    MemberPointsService,
  ],

  exports: [
    MemberService,
    MemberStatisticsService,
    MemberPointsService,
  ],
})
export class MemberAccountModule {}
