import { BullModule } from '@nestjs/bull'
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

import { GoodsAddition } from '@/goods/addition/entity'
import { GoodsAdditionService } from '@/goods/addition/service'
import { GoodsAdditionController } from '@/goods/addition/controller'

import { GoodsProtection } from '@/goods/protection/entity'
import { GoodsProtectionService } from '@/goods/protection/service'
import { GoodsProtectionController } from '@/goods/protection/controller'

import { GoodsAttributeTemplate } from '@/goods/attribute-template/entity'
import { GoodsAttributeTemplateService } from '@/goods/attribute-template/service'
import { GoodsAttributeTemplateController } from '@/goods/attribute-template/controller'

import { GoodsExportRecord } from '@/goods/export/entity'
import { GoodsExportRecordService } from '@/goods/export/service'
import { GoodsExportRecordController } from '@/goods/export/controller'
import { GoodsExportTask } from '@/goods/export/tasks'

import { AssetsModule } from '@/assets/assets.module'
import { GoodsSettings } from '@/goods/goods.settings'
import { GoodsListener } from '@/goods/goods.listener'
import { GoodsScheduler } from '@/goods/goods.scheduler'
import { SettingsModule } from '@/settings/settings.module'

import {
  GOODS_MODULE_ID,
  GOODS_QUEUE_ID,
} from '@/goods/constants'

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
      GoodsAddition,
      GoodsProtection,
      Goods,
      GoodsSku,
      GoodsSpec,
      GoodsExportRecord,
    ]),

    BullModule.registerQueue({
      name: GOODS_QUEUE_ID,
    }),
  ],

  controllers: [
    GoodsController,
    GoodsSpecController,
    GoodsSkuController,
    GoodsAttributeTemplateController,
    GoodsBrandController,
    GoodsCategoryController,
    GoodsGroupController,
    GoodsAdditionController,
    GoodsProtectionController,
    GoodsTagController,
    GoodsExportRecordController,
  ],

  providers: [
    GoodsAttributeTemplateService,
    GoodsBrandService,
    GoodsCategoryService,
    GoodsGroupService,
    GoodsAdditionService,
    GoodsProtectionService,
    GoodsTagService,
    GoodsService,
    GoodsSkuService,
    GoodsSpecService,
    GoodsExportRecordService,

    // Queue Jobs
    GoodsExportTask,

    // Event Listener
    GoodsListener,

    // Scheduler,
    GoodsScheduler,
  ],
})
export class GoodsModule {}
