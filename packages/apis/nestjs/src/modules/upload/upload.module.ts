import { Module, forwardRef } from '@nestjs/common'
import { UPLOAD_MODULE_ID } from '@/upload/constants'
import { UploadService } from '@/upload/upload.service'
import { UploadSettings } from '@/upload/upload.settings'
import { UploadController } from '@/upload/upload.controller'
import { SettingsModule } from '@/settings/settings.module'

@Module({
  imports: [
    forwardRef(() =>
      SettingsModule.register({
        keyPrefix: UPLOAD_MODULE_ID,
        defaultSettings: UploadSettings,
      }),
    ),
  ],
  controllers: [
    UploadController,
  ],
  providers: [
    UploadService,
  ],
  exports: [
    UploadService,
  ],
})
export class UploadModule {}
