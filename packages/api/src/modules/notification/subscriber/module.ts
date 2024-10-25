import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemAuthModule } from '@/system/auth/module'

import { NotificationSubscriberEntity } from './model/entity'
import { NotificationSubscriberRepositoryProvider } from './model/provider'
import { NotificationSellerSubscriberService } from './domain/seller/service'
import { NotificationSubscriberAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationSubscriberEntity,
    ]),

    forwardRef(() => SystemAuthModule),
  ],

  controllers: [
    NotificationSubscriberAdminController,
  ],

  providers: [
    NotificationSubscriberRepositoryProvider,
    NotificationSellerSubscriberService,
  ],

  exports: [
    NotificationSellerSubscriberService,
  ],
})
export class NotificationSubscriberModule {}
