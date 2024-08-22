import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { Resource } from '@/resource/resource/entity'
import { ResourceService } from '@/resource/resource/service'
import { ResourceAdminController } from '@/resource/resource/controller.admin'

import { ResourceGroup } from '@/resource/group/entity'
import { ResourceGroupService } from '@/resource/group/service'
import { ResourceGroupAdminController } from '@/resource/group/controller.admin'

import { ResourceListener } from '@/resource/listener'
import { ResourceProcessor } from '@/resource/processor'

import { RESOURCE_QUEUE_ID } from '@/resource/constants'
import { SettingsModule } from '@/settings/module'
import { UploadModule } from '@/upload/module'

@Module({
  imports: [
    forwardRef(() => SettingsModule),

    forwardRef(() => UploadModule),

    BullModule.registerQueue({
      name: RESOURCE_QUEUE_ID,
    }),

    TypeOrmModule.forFeature([
      Resource,
      ResourceGroup,
    ]),
  ],

  controllers: [
    ResourceAdminController,
    ResourceGroupAdminController,
  ],

  providers: [
    ResourceService,
    ResourceGroupService,

    // Listener
    ResourceListener,

    // Processor
    ResourceProcessor,
  ],

  exports: [
    ResourceService,
  ],
})
export class ResourceModule {}
