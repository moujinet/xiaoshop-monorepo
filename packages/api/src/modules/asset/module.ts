import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

import { ASSET_PROCESS_QUEUE_KEY } from './constants'
import { AssetGroupEntity } from './model/group/entity'
import { AssetGroupService } from './domain/group/service'
import { AssetUploadService } from './domain/upload/service'
import { AssetResourceEntity } from './model/resource/entity'
import { AssetProcessService } from './domain/process/service'
import { AssetResourceService } from './domain/resource/service'
import { AssetGroupRepositoryProvider } from './model/group/provider'
import { AssetResourceRepositoryProvider } from './model/resource/provider'
import { AssetGroupAdminController } from './controller/group/admin.controller'
import { AssetUploadAdminController } from './controller/upload/admin.controller'
import { AssetResourceAdminController } from './controller/resource/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetGroupEntity,
      AssetResourceEntity,
    ]),

    BullModule.registerQueue({
      name: ASSET_PROCESS_QUEUE_KEY,
    }),

    forwardRef(() => SystemSettingModule),
  ],

  controllers: [
    AssetGroupAdminController,
    AssetResourceAdminController,
    AssetUploadAdminController,
  ],

  providers: [
    AssetGroupRepositoryProvider,
    AssetResourceRepositoryProvider,
    AssetGroupService,
    AssetResourceService,
    AssetUploadService,
    AssetProcessService,
  ],

  exports: [
    AssetUploadService,
  ],
})
export class AssetModule {}
