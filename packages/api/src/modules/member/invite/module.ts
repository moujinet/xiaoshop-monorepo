import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { MemberAccountModule } from '@/member/account/module'

import { MemberInviteEntity } from './model/entity'
import { MemberInviteQueryService } from './domain/query/service'
import { MemberInviteRepositoryProvider } from './model/provider'
import { MemberInviteAdminController } from './controller/manage/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberInviteEntity,
    ]),

    forwardRef(() => MemberAccountModule),
  ],

  controllers: [
    MemberInviteAdminController,
  ],

  providers: [
    MemberInviteRepositoryProvider,
    MemberInviteQueryService,
  ],

  exports: [
    MemberInviteRepositoryProvider,
    MemberInviteQueryService,
  ],
})
export class MemberInviteModule {}
