import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { Asset } from '@/assets/asset/entity'
import { AssetService } from '@/assets/asset/service'
import { AssetAdminController } from '@/assets/asset/controller.admin'
import { AssetsTaskImageProcess } from '@/assets/asset/tasks'

import { AssetGroup } from '@/assets/group/entity'
import { AssetGroupService } from '@/assets/group/service'
import { AssetGroupAdminController } from '@/assets/group/controller.admin'

import { AssetsSettings } from '@/assets/assets.settings'
import { ASSET_MODULE_ID, ASSET_QUEUE_ID } from '@/assets/constants'

import { SettingsModule } from '@/settings/settings.module'
import { UploadModule } from '@/upload/upload.module'
import { StaffModule } from '@/staff/staff.module'

@Module({
  imports: [
    StaffModule,

    forwardRef(() => UploadModule),

    forwardRef(() =>
      SettingsModule.register({
        keyPrefix: ASSET_MODULE_ID,
        defaultSettings: AssetsSettings,
      }),
    ),

    BullModule.registerQueue({
      name: ASSET_QUEUE_ID,
    }),

    TypeOrmModule.forFeature([
      Asset,
      AssetGroup,
    ]),
  ],

  controllers: [
    // admin
    AssetAdminController,
    AssetGroupAdminController,
  ],

  providers: [
    AssetService,
    AssetGroupService,
    AssetsTaskImageProcess,
  ],

  exports: [
    AssetService,
  ],
})
export class AssetsModule {}
