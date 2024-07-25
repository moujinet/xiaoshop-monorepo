import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'
import { Asset } from '@/assets/asset/entity'
import { AssetService } from '@/assets/asset/service'
import { AssetController } from '@/assets/asset/controller'
import { AssetGroup } from '@/assets/group/entity'
import { AssetGroupService } from '@/assets/group/service'
import { AssetGroupController } from '@/assets/group/controller'
import { AssetsSettings } from '@/assets/assets.settings'
import { SettingsModule } from '@/settings/settings.module'
import { AssetsTaskImageProcess } from '@/assets/asset/tasks'
import { ASSET_MODULE_ID, ASSET_QUEUE_ID } from '@/assets/constants'
import { UploadModule } from '@/upload/upload.module'

@Module({
  imports: [
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
    AssetController,
    AssetGroupController,
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
