import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { PointsRule } from '@/points/rule/entity'
import { PointsRuleService } from '@/points/rule/service'
import { PointsRuleAdminController } from '@/points/rule/controller.admin'
import { PointsRuleListener } from '@/points/rule/listener'

import { PointsChangeLog } from '@/points/change/entity'
import { PointsChangeService } from '@/points/change/service'
import { PointsChangeAdminController } from '@/points/change/controller.admin'
import { PointsChangeListener } from '@/points/change/listener'

import { StaffModule } from '@/staff/staff.module'
import { MemberModule } from '@/member/member.module'
import { SettingsModule } from '@/settings/settings.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointsRule,
      PointsChangeLog,
    ]),

    forwardRef(() => StaffModule),
    forwardRef(() => MemberModule),
    forwardRef(() => SettingsModule.register()),
  ],

  controllers: [
    PointsChangeAdminController,
    PointsRuleAdminController,
  ],

  providers: [
    PointsRuleService,
    PointsChangeService,

    // Listeners
    PointsRuleListener,
    PointsChangeListener,
  ],
})
export class PointsModule {}
