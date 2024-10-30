import { Module } from '@nestjs/common'

import { MemberTagModule } from './tag/module'
import { MemberCardModule } from './card/module'
import { MemberGroupModule } from './group/module'
import { MemberPointsModule } from './points/module'
import { MemberInviteModule } from './invite/module'
import { MemberAccountModule } from './account/module'
import { MemberUnregisterModule } from './unregister/module'

@Module({
  imports: [
    MemberAccountModule,
    MemberGroupModule,
    MemberTagModule,
    MemberCardModule,
    MemberPointsModule,
    MemberInviteModule,
    MemberUnregisterModule,
  ],
})
export class MemberModule {}
