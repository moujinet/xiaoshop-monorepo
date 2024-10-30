import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MemberTagEntity } from './model/entity'
import { MemberTagService } from './domain/manage/service'
import { MemberTagRepositoryProvider } from './model/provider'
import { MemberTagAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberTagEntity,
    ]),
  ],

  controllers: [
    MemberTagAdminController,
  ],

  providers: [
    MemberTagRepositoryProvider,
    MemberTagService,
  ],

  exports: [
    MemberTagRepositoryProvider,
  ],
})
export class MemberTagModule {}
