import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { Member } from '@/member/profile/entity'
import { MemberService } from '@/member/profile/service'
import { MemberAdminController } from '@/member/profile/controller.admin'

import { MemberAccount } from '@/member/account/entity'
import { MemberAccountService } from '@/member/account/service'
import { MemberAccountAdminController } from '@/member/account/controller.admin'

import { MemberCardBinding } from '@/member/binding/entity'
import { MemberCardBindingService } from '@/member/binding/service'
import { MemberCardBindingAdminController } from '@/member/binding/controller.admin'

import { MemberCard } from '@/member/card/entity'
import { MemberCardService } from '@/member/card/service'
import { MemberCardAdminController } from '@/member/card/controller.admin'

import { MemberGroup } from '@/member/group/entity'
import { MemberGroupService } from '@/member/group/service'
import { MemberGroupAdminController } from '@/member/group/controller.admin'

import { MemberTag } from '@/member/tag/entity'
import { MemberTagService } from '@/member/tag/service'
import { MemberTagAdminController } from '@/member/tag/controller.admin'

import { MemberAddress } from '@/member/address/entity'
import { MemberAddressService } from '@/member/address/service'
import { MemberAddressAdminController } from '@/member/address/controller.admin'

import { MemberLogout } from '@/member/logout/entity'
import { MemberLogoutService } from '@/member/logout/service'
import { MemberLogoutAdminController } from '@/member/logout/controller.admin'

import { MemberSettings } from '@/member/member.settings'
import { MemberScheduler } from '@/member/member.scheduler'
import { MEMBER_MODULE_ID } from '@/member/constants'

import { SettingsModule } from '@/settings/settings.module'
import { StaffModule } from '@/staff/staff.module'

@Module({
  imports: [
    StaffModule,

    forwardRef(() =>
      SettingsModule.register({
        keyPrefix: MEMBER_MODULE_ID,
        defaultSettings: MemberSettings,
      }),
    ),

    TypeOrmModule.forFeature([
      Member,
      MemberAccount,
      MemberCardBinding,
      MemberCard,
      MemberGroup,
      MemberTag,
      MemberAddress,
      MemberLogout,
    ]),

  ],

  controllers: [

    // admin
    MemberAdminController,
    MemberAccountAdminController,
    MemberCardBindingAdminController,
    MemberCardAdminController,
    MemberGroupAdminController,
    MemberTagAdminController,
    MemberAddressAdminController,
    MemberLogoutAdminController,
  ],

  providers: [
    MemberService,
    MemberAccountService,
    MemberCardBindingService,
    MemberCardService,
    MemberGroupService,
    MemberTagService,
    MemberAddressService,
    MemberLogoutService,

    // Scheduler
    MemberScheduler,
  ],

  exports: [
    MemberAccountService,
  ],
})
export class MemberModule {}
