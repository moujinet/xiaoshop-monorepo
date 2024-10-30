import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MemberPointsRuleEntity } from './model/rule/entity'
import { MemberPointsRuleService } from './domain/rule/service'
import { MemberPointsChangeEntity } from './model/change/entity'
import { MemberPointsChangeService } from './domain/change/service'
import { MemberPointsRuleRepositoryProvider } from './model/rule/provider'
import { MemberPointsChangeRepositoryProvider } from './model/change/provider'
import { MemberPointsRuleAdminController } from './controller/rule/admin.controller'
import { MemberPointsChangeAdminController } from './controller/change/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberPointsRuleEntity,
      MemberPointsChangeEntity,
    ]),
  ],

  controllers: [
    MemberPointsRuleAdminController,
    MemberPointsChangeAdminController,
  ],

  providers: [
    MemberPointsRuleRepositoryProvider,
    MemberPointsChangeRepositoryProvider,
    MemberPointsRuleService,
    MemberPointsChangeService,
  ],

  exports: [
    MemberPointsRuleService,
  ],
})
export class MemberPointsModule {}
