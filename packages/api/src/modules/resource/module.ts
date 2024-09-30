import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

import { ResourceListener } from './listener'
import { RESOURCE_QUEUE_ID } from './constants'
import { ResourceProcessor } from './processor'
import { ResourceEntity } from './resource/entity'
import { ResourceGroupEntity } from './group/entity'
import { ResourceAdminService } from './resource/admin/service'
import { ResourceUploadService } from './resource/upload/service'
import { ResourceGroupAdminService } from './group/admin/service'
import { ResourceAdminController } from './resource/admin/controller'
import { ResourceUploadController } from './resource/upload/controller'
import { ResourceGroupAdminController } from './group/admin/controller'

@Module({
  imports: [
    forwardRef(() => SystemSettingModule),

    BullModule.registerQueue({
      name: RESOURCE_QUEUE_ID,
    }),

    TypeOrmModule.forFeature([
      ResourceEntity,
      ResourceGroupEntity,
    ]),
  ],

  controllers: [
    ResourceUploadController,
    ResourceAdminController,
    ResourceGroupAdminController,
  ],

  providers: [
    ResourceUploadService,
    ResourceAdminService,
    ResourceGroupAdminService,

    // Listener
    ResourceListener,

    // Processor
    ResourceProcessor,
  ],

  exports: [
    ResourceUploadService,
  ],
})
export class ResourceModule {}
