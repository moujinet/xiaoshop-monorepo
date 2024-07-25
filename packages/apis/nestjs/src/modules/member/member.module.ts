import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { Member } from '@/member/account/entities/profile.entity'
import { MemberAccount } from '@/member/account/entities/account.entity'
import { MemberToken } from '@/member/account/entities/token.entity'

import { MemberAddress } from '@/member/address/entity'
import { MemberAddressService } from '@/member/address/service'
import { MemberAddressController } from '@/member/address/controller'

import { MemberCard } from '@/member/card/entities/card.entity'
import { MemberCardPlan } from '@/member/card/entities/card-plan.entity'
import { MemberCardBinding } from '@/member/card/entities/card-binding.entity'
import { MemberCardService } from '@/member/card/service'
import { MemberCardController } from '@/member/card/controller'

import { MemberGroup } from '@/member/group/entity'
import { MemberGroupService } from '@/member/group/service'
import { MemberGroupController } from '@/member/group/controller'

import { MemberLog } from '@/member/log/entity'
import { MemberLogService } from '@/member/log/service'

import { MemberLogout } from '@/member/logout/entity'
import { MemberLogoutService } from '@/member/logout/service'
import { MemberLogoutController } from '@/member/logout/controller'

import { MemberPointsRule } from '@/member/points/entity'
import { MemberPointsRuleService } from '@/member/points/service'
import { MemberPointsRuleController } from '@/member/points/controller'

import { MemberTag } from '@/member/tag/entity'
import { MemberTagService } from '@/member/tag/service'
import { MemberTagController } from '@/member/tag/controller'

import { MEMBER_MODULE_ID } from '@/member/constants'
import { MemberSettings } from '@/member/member.settings'
import { SettingsModule } from '@/settings/settings.module'
import { MemberScheduleService } from '@/member/member.schedule'
import { MemberLogoutListener } from '@/member/account/listeners/member-logout.listener'

@Module({
  imports: [
    forwardRef(() =>
      SettingsModule.register({
        keyPrefix: MEMBER_MODULE_ID,
        defaultSettings: MemberSettings,
      }),
    ),

    TypeOrmModule.forFeature([
      Member,
      MemberAccount,
      MemberToken,
      MemberAddress,
      MemberCard,
      MemberCardPlan,
      MemberCardBinding,
      MemberGroup,
      MemberLog,
      MemberLogout,
      MemberPointsRule,
      MemberTag,
    ]),
  ],

  controllers: [
    MemberAddressController,
    MemberCardController,
    MemberGroupController,
    MemberLogoutController,
    MemberPointsRuleController,
    MemberTagController,
  ],

  providers: [
    MemberAddressService,
    MemberCardService,
    MemberGroupService,
    MemberLogoutService,
    MemberLogService,
    MemberPointsRuleService,
    MemberTagService,

    // Scheduler
    MemberScheduleService,

    // Listeners
    MemberLogoutListener,
  ],
})
export class MemberModule {}
