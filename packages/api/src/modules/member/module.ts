import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { MemberAccount } from '@/member/account/entity'
import { MemberAccountService } from '@/member/account/service'
import { MemberAccountAdminController } from '@/member/account/controller.admin'

import { MemberBinding } from '@/member/binding/entity'
import { MemberBindingService } from '@/member/binding/service'
import { MemberBindingAdminController } from '@/member/binding/controller.admin'

import { MemberCard } from '@/member/card/entity'
import { MemberCardService } from '@/member/card/service'
import { MemberCardAdminController } from '@/member/card/controller.admin'

import { MemberGroup } from '@/member/group/entity'
import { MemberGroupService } from '@/member/group/service'
import { MemberGroupAdminController } from '@/member/group/controller.admin'

import { MemberTag } from '@/member/tag/entity'
import { MemberTagService } from '@/member/tag/service'
import { MemberTagAdminController } from '@/member/tag/controller.admin'

import { MemberAccountChangeLog } from '@/member/change-log/entity'
import { MemberAccountChangeLogService } from '@/member/change-log/service'
import { MemberAccountChangeLogAdminController } from '@/member/change-log/controller.admin'

import { MemberAddress } from '@/member/address/entity'
import { MemberAddressService } from '@/member/address/service'
import { MemberAddressAdminController } from '@/member/address/controller.admin'

import { MemberUnregister } from '@/member/unregister/entity'
import { MemberUnregisterService } from '@/member/unregister/service'
import { MemberUnregisterAdminController } from '@/member/unregister/controller.admin'

import { MemberPointsRuleService } from '@/member/points-rule/service'
import { MemberPointsRuleAdminController } from '@/member/points-rule/controller.admin'

import { MemberListener } from '@/member/listener'
import { SettingsModule } from '@/settings/module'

@Module({
  imports: [
    forwardRef(() => SettingsModule),

    TypeOrmModule.forFeature([
      MemberAccount,
      MemberBinding,
      MemberCard,
      MemberGroup,
      MemberTag,
      MemberAccountChangeLog,
      MemberUnregister,
      MemberAddress,
    ]),
  ],

  controllers: [
    MemberAccountAdminController,
    MemberBindingAdminController,
    MemberCardAdminController,
    MemberGroupAdminController,
    MemberTagAdminController,
    MemberPointsRuleAdminController,
    MemberAccountChangeLogAdminController,
    MemberUnregisterAdminController,
    MemberAddressAdminController,
  ],

  providers: [
    MemberAccountService,
    MemberBindingService,
    MemberCardService,
    MemberGroupService,
    MemberTagService,
    MemberPointsRuleService,
    MemberAccountChangeLogService,
    MemberUnregisterService,
    MemberAddressService,

    // Listener
    MemberListener,
  ],

  exports: [
    MemberAccountService,
    MemberAddressService,
  ],
})
export class MemberModule {}
