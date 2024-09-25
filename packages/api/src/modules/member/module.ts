import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingsModule } from '@/system/settings/module'

import { MemberTag } from './tag/entity'
import { Member } from './member/entity'
import { MemberGroup } from './group/entity'
import { MemberCard } from './card/card/entity'
import { MemberTagService } from './tag/service'
import { MemberGroupService } from './group/service'
import { MemberCardService } from './card/card/service'
import { MemberAccount } from './account/account/entity'
import { MemberCardBinding } from './card/binding/entity'
import { MemberCardUpgrade } from './card/upgrade/entity'
import { MemberAccountChange } from './account/change/entity'
import { MemberTagAdminController } from './tag/controller.admin'
import { MemberCardBindingService } from './card/binding/service'
import { MemberCardUpgradeService } from './card/upgrade/service'
import { MemberGroupAdminController } from './group/controller.admin'
import { MemberCardAdminController } from './card/card/controller.admin'
import { MemberCardBindingAdminController } from './card/binding/controller.admin'

@Module({
  imports: [
    forwardRef(() => SystemSettingsModule),

    TypeOrmModule.forFeature([
      Member,
      MemberAccount,
      MemberAccountChange,
      MemberCard,
      MemberCardBinding,
      MemberCardUpgrade,
      MemberTag,
      MemberGroup,
    ]),
  ],

  controllers: [
    MemberCardAdminController,
    MemberCardBindingAdminController,
    MemberTagAdminController,
    MemberGroupAdminController,
  ],

  providers: [
    MemberCardBindingService,
    MemberCardUpgradeService,
    MemberCardService,
    MemberTagService,
    MemberGroupService,
  ],

  exports: [],
})
export class MemberModule {}
