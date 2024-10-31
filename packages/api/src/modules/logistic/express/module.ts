import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LogisticExpressEntity } from './model/entity'
import { LogisticExpressService } from './domain/manage/service'
import { LogisticExpressRepositoryProvider } from './model/provider'
import { LogisticExpressAdminController } from './controller/manage/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogisticExpressEntity,
    ]),
  ],

  controllers: [
    LogisticExpressAdminController,
  ],

  providers: [
    LogisticExpressRepositoryProvider,
    LogisticExpressService,
  ],
})
export class LogisticExpressModule {}
