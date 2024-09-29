import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

import { ResourceListener } from './listener'
import { RESOURCE_QUEUE_ID } from './constants'
import { ResourceProcessor } from './processor'
import { ResourceEntity } from './resource/entity'
import { ResourceGroupEntity } from './group/entity'
import { ResourceService } from './resource/service'
import { ResourceGroupService } from './group/service'
import { ResourceUploadService } from './upload/service'
import { ResourceAdminController } from './resource/controller.admin'
import { ResourceGroupAdminController } from './group/controller.admin'
import { ResourceUploadAdminController } from './upload/controller.admin'

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
    ResourceAdminController,
    ResourceGroupAdminController,
    ResourceUploadAdminController,
  ],

  providers: [
    ResourceService,
    ResourceGroupService,
    ResourceUploadService,

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
