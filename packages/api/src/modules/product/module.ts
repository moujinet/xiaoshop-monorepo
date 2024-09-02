import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { Product } from '@/product/product/entity'
import { ProductService } from '@/product/product/service'
import { ProductAdminController } from '@/product/product/controller.admin'

import { ProductSku } from '@/product/sku/entity'
import { ProductSkuService } from '@/product/sku/service'
import { ProductSkuAdminController } from '@/product/sku/controller.admin'

import { ProductCategory } from '@/product/category/entity'
import { ProductCategoryService } from '@/product/category/service'
import { ProductCategoryAdminController } from '@/product/category/controller.admin'

import { ProductBrand } from '@/product/brand/entity'
import { ProductBrandService } from '@/product/brand/service'
import { ProductBrandAdminController } from '@/product/brand/controller.admin'

import { ProductGroup } from '@/product/group/entity'
import { ProductGroupService } from '@/product/group/service'
import { ProductGroupAdminController } from '@/product/group/controller.admin'

import { ProductTag } from '@/product/tag/entity'
import { ProductTagService } from '@/product/tag/service'
import { ProductTagAdminController } from '@/product/tag/controller.admin'

import { ProductAddition } from '@/product/addition/entity'
import { ProductAdditionService } from '@/product/addition/service'
import { ProductAdditionAdminController } from '@/product/addition/controller.admin'

import { ProductCommitment } from '@/product/commitment/entity'
import { ProductCommitmentService } from '@/product/commitment/service'
import { ProductCommitmentAdminController } from '@/product/commitment/controller.admin'

import { ProductAttributeTemplate } from '@/product/attribute-template/entity'
import { ProductAttributeTemplateService } from '@/product/attribute-template/service'
import { ProductAttributeTemplateAdminController } from '@/product/attribute-template/controller.admin'

import { ProductExport } from '@/product/export/entity'
import { ProductExportService } from '@/product/export/service'
import { ProductExportAdminController } from '@/product/export/controller.admin'

import { ProductListener } from '@/product/listener'
import { ProductProcessor } from '@/product/processor'
import { ProductScheduler } from '@/product/scheduler'
import { PRODUCT_QUEUE_ID } from '@/product/constants'

import { SettingsModule } from '@/settings/module'

@Module({
  imports: [
    forwardRef(() => SettingsModule),

    TypeOrmModule.forFeature([
      Product,
      ProductSku,
      ProductCategory,
      ProductBrand,
      ProductGroup,
      ProductTag,
      ProductAddition,
      ProductCommitment,
      ProductAttributeTemplate,
      ProductExport,
    ]),

    BullModule.registerQueue({
      name: PRODUCT_QUEUE_ID,
    }),
  ],

  controllers: [
    ProductAdminController,
    ProductSkuAdminController,
    ProductCategoryAdminController,
    ProductBrandAdminController,
    ProductGroupAdminController,
    ProductTagAdminController,
    ProductAdditionAdminController,
    ProductCommitmentAdminController,
    ProductAttributeTemplateAdminController,
    ProductExportAdminController,
  ],

  providers: [
    ProductService,
    ProductSkuService,
    ProductCategoryService,
    ProductBrandService,
    ProductGroupService,
    ProductTagService,
    ProductAdditionService,
    ProductCommitmentService,
    ProductAttributeTemplateService,
    ProductExportService,

    // Listener
    ProductListener,

    // Processor
    ProductProcessor,

    // Scheduler
    ProductScheduler,
  ],

  exports: [
    ProductService,
    ProductSkuService,
  ],
})
export class ProductModule {}
