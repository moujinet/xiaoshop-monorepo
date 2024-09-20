import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingsModule } from '@/system/settings/module'

import { Resource } from './resource/entity'
import { ResourceListener } from './listener'
import { ResourceGroup } from './group/entity'
import { RESOURCE_QUEUE_ID } from './constants'
import { ResourceProcessor } from './processor'
import { ResourceService } from './resource/service'
import { ResourceGroupService } from './group/service'
import { ResourceUploadService } from './upload/service'
import { ResourceAdminController } from './resource/controller.admin'
import { ResourceGroupAdminController } from './group/controller.admin'
import { ResourceUploadAdminController } from './upload/controller.admin'

@Module({
  imports: [
    forwardRef(() => SystemSettingsModule),

    TypeOrmModule.forFeature([
      Resource,
      ResourceGroup,
    ]),

    BullModule.registerQueue({
      name: RESOURCE_QUEUE_ID,
    }),
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

    // Processor
    ResourceProcessor,

    // Listener
    ResourceListener,
  ],

  exports: [
    ResourceUploadService,
  ],
})
export class ResourceModule {}
