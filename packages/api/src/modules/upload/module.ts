import { Module, forwardRef } from '@nestjs/common'

import { UploadService } from '@/upload/service'
import { UploadController } from '@/upload/controller'
import { UploadAdminController } from '@/upload/controller.admin'

import { SettingsModule } from '@/settings/module'

@Module({
  imports: [
    forwardRef(() => SettingsModule),
  ],

  controllers: [
    UploadController,
    UploadAdminController,
  ],

  providers: [
    UploadService,
  ],

  exports: [
    UploadService,
  ],
})
export class UploadModule {}
