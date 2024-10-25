import { Module } from '@nestjs/common'

import { NotificationLogModule } from './log/module'
import { NotificationInboxModule } from './inbox/module'
import { NotificationMessageModule } from './message/module'
import { NotificationSubscriberModule } from './subscriber/module'

@Module({
  imports: [
    NotificationLogModule,
    NotificationInboxModule,
    NotificationMessageModule,
    NotificationSubscriberModule,
  ],
})
export class NotificationModule {}
