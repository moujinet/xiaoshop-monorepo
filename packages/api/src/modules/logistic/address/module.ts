import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LogisticAddressEntity } from './model/entity'
import { LogisticAddressRepositoryProvider } from './model/provider'
import { LogisticAddressBuyerService } from './domain/buyer/service'
import { LogisticAddressSellerService } from './domain/seller/service'
import { LogisticAddressBuyerAdminController } from './controller/buyer/admin.controller'
import { LogisticAddressSellerAdminController } from './controller/seller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogisticAddressEntity,
    ]),
  ],

  controllers: [
    LogisticAddressSellerAdminController,
    LogisticAddressBuyerAdminController,
  ],

  providers: [
    LogisticAddressRepositoryProvider,
    LogisticAddressSellerService,
    LogisticAddressBuyerService,
  ],

  exports: [
    LogisticAddressRepositoryProvider,
    LogisticAddressSellerService,
    LogisticAddressBuyerService,
  ],
})
export class LogisticAddressModule {}
