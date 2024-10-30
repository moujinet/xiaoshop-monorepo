import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { MemberAccountModule } from '@/member/account/module'

import { MemberGroupEntity } from './model/entity'
import { MemberGroupService } from './domain/manage/service'
import { MemberGroupRepositoryProvider } from './model/provider'
import { MemberGroupRefreshService } from './domain/refresh/service'
import { MemberGroupAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberGroupEntity,
    ]),

    forwardRef(() => MemberAccountModule),
  ],

  controllers: [
    MemberGroupAdminController,
  ],

  providers: [
    MemberGroupRepositoryProvider,
    MemberGroupRefreshService,
    MemberGroupService,
  ],
})
export class MemberGroupModule {}
