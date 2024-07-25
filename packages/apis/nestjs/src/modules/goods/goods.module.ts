import { TypeOrmModule } from '@nestjs/typeorm'
import { Global, Module, forwardRef } from '@nestjs/common'

import { Goods } from '@/goods/manage/entity'
import { GoodsService } from '@/goods/manage/service'
import { GoodsController } from '@/goods/manage/controller'

import { GoodsSku } from '@/goods/sku/entity'
import { GoodsSkuService } from '@/goods/sku/service'
import { GoodsSkuController } from '@/goods/sku/controller'

import { GoodsSpec } from '@/goods/spec/entity'
import { GoodsSpecService } from '@/goods/spec/service'
import { GoodsSpecController } from '@/goods/spec/controller'

import { GoodsBrand } from '@/goods/brand/entity'
import { GoodsBrandService } from '@/goods/brand/service'
import { GoodsBrandController } from '@/goods/brand/controller'

import { GoodsCategory } from '@/goods/category/entity'
import { GoodsCategoryService } from '@/goods/category/service'
import { GoodsCategoryController } from '@/goods/category/controller'

import { GoodsGroup } from '@/goods/group/entity'
import { GoodsGroupService } from '@/goods/group/service'
import { GoodsGroupController } from '@/goods/group/controller'

import { GoodsTag } from '@/goods/tag/entity'
import { GoodsTagService } from '@/goods/tag/service'
import { GoodsTagController } from '@/goods/tag/controller'

import { GoodsAdditional } from '@/goods/additional/entity'
import { GoodsAdditionalService } from '@/goods/additional/service'
import { GoodsAdditionalController } from '@/goods/additional/controller'

import { GoodsProtection } from '@/goods/protection/entity'
import { GoodsProtectionService } from '@/goods/protection/service'
import { GoodsProtectionController } from '@/goods/protection/controller'

import { GoodsAttributeTemplate } from '@/goods/attribute-template/entity'
import { GoodsAttributeTemplateService } from '@/goods/attribute-template/service'
import { GoodsAttributeTemplateController } from '@/goods/attribute-template/controller'

import { GOODS_MODULE_ID } from '@/goods/constants'
import { AssetsModule } from '@/assets/assets.module'
import { GoodsSettings } from '@/goods/goods.settings'
import { GoodsListener } from '@/goods/goods.listener'
import { GoodsScheduler } from '@/goods/goods.scheduler'
import { SettingsModule } from '@/settings/settings.module'

@Global()
@Module({
  imports: [
    forwardRef(() => AssetsModule),

    forwardRef(() =>
      SettingsModule.register({
        keyPrefix: GOODS_MODULE_ID,
        defaultSettings: GoodsSettings,
      }),
    ),

    TypeOrmModule.forFeature([
      GoodsAttributeTemplate,
      GoodsCategory,
      GoodsBrand,
      GoodsGroup,
      GoodsTag,
      GoodsAdditional,
      GoodsProtection,
      Goods,
      GoodsSku,
      GoodsSpec,
    ]),
  ],

  controllers: [
    GoodsController,
    GoodsSpecController,
    GoodsSkuController,
    GoodsAttributeTemplateController,
    GoodsBrandController,
    GoodsCategoryController,
    GoodsGroupController,
    GoodsAdditionalController,
    GoodsProtectionController,
    GoodsTagController,
  ],

  providers: [
    GoodsAttributeTemplateService,
    GoodsBrandService,
    GoodsCategoryService,
    GoodsGroupService,
    GoodsAdditionalService,
    GoodsProtectionService,
    GoodsTagService,
    GoodsService,
    GoodsSkuService,
    GoodsSpecService,

    // Event Listener
    GoodsListener,

    // Scheduler,
    GoodsScheduler,
  ],
})
export class GoodsModule {}
