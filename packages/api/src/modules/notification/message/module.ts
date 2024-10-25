import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'
import { NotificationSubscriberModule } from '@/notification/subscriber/module'

import { NotificationMessageEntity } from './model/entity'
import { NOTIFICATION_MESSAGE_QUEUE_KEY } from './constants'
import { NotificationMessageService } from './domain/manage/service'
import { NotificationMessageRepositoryProvider } from './model/provider'
import { NotificationMessageSubscribeService } from './domain/subscribe/service'
import { NotificationMessageAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationMessageEntity,
    ]),

    BullModule.registerQueue({
      name: NOTIFICATION_MESSAGE_QUEUE_KEY,
    }),

    forwardRef(() => SystemSettingModule),
    forwardRef(() => NotificationSubscriberModule),
  ],

  controllers: [
    NotificationMessageAdminController,
  ],

  providers: [
    NotificationMessageRepositoryProvider,
    NotificationMessageSubscribeService,
    NotificationMessageService,
  ],
})
export class NotificationMessageModule {}
