import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductServiceExtraEntity } from './model/extra/entity'
import { ProductServiceExtraService } from './domain/extra/service'
import { ProductServiceAdditionEntity } from './model/addition/entity'
import { ProductServiceAdditionService } from './domain/addition/service'
import { ProductServiceExtraRepositoryProvider } from './model/extra/provider'
import { ProductServiceAdditionRepositoryProvider } from './model/addition/provider'
import { ProductServiceExtraAdminController } from './controller/extra/admin.controller'
import { ProductServiceAdditionAdminController } from './controller/addition/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductServiceAdditionEntity,
      ProductServiceExtraEntity,
    ]),
  ],

  controllers: [
    ProductServiceAdditionAdminController,
    ProductServiceExtraAdminController,
  ],

  providers: [
    ProductServiceAdditionRepositoryProvider,
    ProductServiceExtraRepositoryProvider,
    ProductServiceAdditionService,
    ProductServiceExtraService,
  ],

  exports: [
    ProductServiceAdditionRepositoryProvider,
    ProductServiceExtraRepositoryProvider,
    ProductServiceAdditionService,
    ProductServiceExtraService,
  ],
})
export class ProductServiceModule {}
