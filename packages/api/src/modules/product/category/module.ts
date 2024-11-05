import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductCategoryEntity } from './model/entity'
import { ProductCategoryService } from './domain/manage/service'
import { ProductCategoryRepositoryProvider } from './model/provider'
import { ProductCategoryAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategoryEntity,
    ]),
  ],

  controllers: [
    ProductCategoryAdminController,
  ],

  providers: [
    ProductCategoryRepositoryProvider,
    ProductCategoryService,
  ],

  exports: [
    ProductCategoryRepositoryProvider,
    ProductCategoryService,
  ],
})
export class ProductCategoryModule {}
