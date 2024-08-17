import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Global, Module, forwardRef } from '@nestjs/common'

import { Goods } from '@/goods/manage/entity'
import { GoodsService } from '@/goods/manage/service'
import { GoodsAdminController } from '@/goods/manage/controller.admin'

import { GoodsSku } from '@/goods/sku/entity'
import { GoodsSkuService } from '@/goods/sku/service'
import { GoodsSkuAdminController } from '@/goods/sku/controller.admin'

import { GoodsSpec } from '@/goods/spec/entity'
import { GoodsSpecService } from '@/goods/spec/service'
import { GoodsSpecAdminController } from '@/goods/spec/controller.admin'

import { GoodsBrand } from '@/goods/brand/entity'
import { GoodsBrandService } from '@/goods/brand/service'
import { GoodsBrandAdminController } from '@/goods/brand/controller.admin'

import { GoodsCategory } from '@/goods/category/entity'
import { GoodsCategoryService } from '@/goods/category/service'
import { GoodsCategoryAdminController } from '@/goods/category/controller.admin'

import { GoodsGroup } from '@/goods/group/entity'
import { GoodsGroupService } from '@/goods/group/service'
import { GoodsGroupAdminController } from '@/goods/group/controller.admin'

import { GoodsTag } from '@/goods/tag/entity'
import { GoodsTagService } from '@/goods/tag/service'
import { GoodsTagAdminController } from '@/goods/tag/controller.admin'

import { GoodsAddition } from '@/goods/addition/entity'
import { GoodsAdditionService } from '@/goods/addition/service'
import { GoodsAdditionAdminController } from '@/goods/addition/controller.admin'

import { GoodsProtection } from '@/goods/protection/entity'
import { GoodsProtectionService } from '@/goods/protection/service'
import { GoodsProtectionAdminController } from '@/goods/protection/controller.admin'

import { GoodsAttributeTemplate } from '@/goods/attribute-template/entity'
import { GoodsAttributeTemplateService } from '@/goods/attribute-template/service'
import { GoodsAttributeTemplateAdminController } from '@/goods/attribute-template/controller.admin'

import { GoodsExportRecord } from '@/goods/export/entity'
import { GoodsExportRecordService } from '@/goods/export/service'
import { GoodsExportRecordAdminController } from '@/goods/export/controller.admin'
import { GoodsExportTask } from '@/goods/export/tasks'

import { AssetsModule } from '@/assets/assets.module'
import { GoodsSettings } from '@/goods/goods.settings'
import { GoodsListener } from '@/goods/goods.listener'
import { GoodsScheduler } from '@/goods/goods.scheduler'
import { SettingsModule } from '@/settings/settings.module'
import { StaffModule } from '@/staff/staff.module'

import {
  GOODS_MODULE_ID,
  GOODS_QUEUE_ID,
} from '@/goods/constants'

@Global()
@Module({
  imports: [
    StaffModule,

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
    // Admin
    GoodsAdminController,
    GoodsSpecAdminController,
    GoodsSkuAdminController,
    GoodsAttributeTemplateAdminController,
    GoodsBrandAdminController,
    GoodsCategoryAdminController,
    GoodsGroupAdminController,
    GoodsAdditionAdminController,
    GoodsProtectionAdminController,
    GoodsTagAdminController,
    GoodsExportRecordAdminController,
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
