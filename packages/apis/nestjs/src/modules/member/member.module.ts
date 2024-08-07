import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { MemberService } from '@/member/account/service'
import { MemberController } from '@/member/account/controller'
import { Member, MemberAccount } from '@/member/account/entities'

import { MemberCardService } from '@/member/card/service'
import { MemberCardController } from '@/member/card/controller'
import { MemberCard, MemberCardBinding } from '@/member/card/entities'

import { MemberGroup } from '@/member/group/entity'
import { MemberGroupService } from '@/member/group/service'
import { MemberGroupController } from '@/member/group/controller'

import { MemberTag } from '@/member/tag/entity'
import { MemberTagService } from '@/member/tag/service'
import { MemberTagController } from '@/member/tag/controller'

import { MemberPointsRule } from '@/member/points/entity'
import { MemberPointsRuleService } from '@/member/points/service'
import { MemberPointsRuleController } from '@/member/points/controller'

import { MemberAddress } from '@/member/address/entity'
import { MemberAddressService } from '@/member/address/service'
import { MemberAddressController } from '@/member/address/controller'

import { MemberLogout } from '@/member/logout/entity'
import { MemberLogoutService } from '@/member/logout/service'
import { MemberLogoutController } from '@/member/logout/controller'

import { SettingsModule } from '@/settings/settings.module'
import { MemberSettings } from '@/member/member.settings'

import { MEMBER_MODULE_ID } from '@/member/constants'

import { MemberScheduler } from '@/member/member.scheduler'

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
      MemberCard,
      MemberCardBinding,
      MemberGroup,
      MemberTag,
      MemberAddress,
      MemberPointsRule,
      MemberLogout,
    ]),

  ],

  controllers: [
    MemberController,
    MemberCardController,
    MemberGroupController,
    MemberTagController,
    MemberPointsRuleController,
    MemberAddressController,
    MemberLogoutController,
  ],

  providers: [
    MemberService,
    MemberCardService,
    MemberGroupService,
    MemberTagService,
    MemberAddressService,
    MemberPointsRuleService,
    MemberLogoutService,

    // Scheduler
    MemberScheduler,
  ],
})
export class MemberModule {}
