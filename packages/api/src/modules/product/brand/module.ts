import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductBrandEntity } from './model/entity'
import { ProductBrandService } from './domain/manage/service'
import { ProductBrandRepositoryProvider } from './model/provider'
import { ProductBrandAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductBrandEntity,
    ]),
  ],

  controllers: [
    ProductBrandAdminController,
  ],

  providers: [
    ProductBrandRepositoryProvider,
    ProductBrandService,
  ],

  exports: [
    ProductBrandRepositoryProvider,
    ProductBrandService,
  ],
})
export class ProductBrandModule {}
