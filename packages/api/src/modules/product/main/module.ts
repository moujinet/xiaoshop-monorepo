import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { LogisticModule } from '@/logistic/module'
import { ProductTagModule } from '@/product/tag/module'
import { ProductBrandModule } from '@/product/brand/module'
import { ProductGroupModule } from '@/product/group/module'
import { SystemSettingModule } from '@/system/setting/module'
import { ProductServiceModule } from '@/product/service/module'
import { ProductCategoryModule } from '@/product/category/module'

import { ProductSkuEntity } from './model/sku/entity'
import { ProductEntity } from './model/product/entity'
import { ProductService } from './domain/manage/service'
import { ProductRecycleService } from './domain/recycle/service'
import { ProductSkuRepositoryProvider } from './model/sku/provider'
import { ProductRepositoryProvider } from './model/product/provider'
import { ProductAdminController } from './controller/manage/admin.controller'
import { ProductRecycleAdminController } from './controller/recycle/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductSkuEntity,
    ]),

    forwardRef(() => LogisticModule),
    forwardRef(() => SystemSettingModule),

    forwardRef(() => ProductTagModule),
    forwardRef(() => ProductBrandModule),
    forwardRef(() => ProductGroupModule),
    forwardRef(() => ProductCategoryModule),
    forwardRef(() => ProductServiceModule),
  ],

  controllers: [
    ProductAdminController,
    ProductRecycleAdminController,
  ],

  providers: [
    ProductRepositoryProvider,
    ProductSkuRepositoryProvider,
    ProductService,
    ProductRecycleService,
  ],

  exports: [
    ProductService,
    ProductRecycleService,
  ],
})
export class ProductMainModule {}
