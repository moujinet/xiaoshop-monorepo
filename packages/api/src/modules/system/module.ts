import { Module } from '@nestjs/common'

import { SystemLogModule } from './log/module'
import { SystemAuthModule } from './auth/module'
import { SystemDictModule } from './dict/module'
import { SystemSettingModule } from './setting/module'
import { SystemNotificationModule } from './notification/module'
import { SystemOrganizationModule } from './organization/module'

@Module({
  imports: [
    SystemSettingModule,
    SystemAuthModule,
    SystemLogModule,
    SystemNotificationModule,
    SystemDictModule,
    SystemOrganizationModule,
  ],
})
export class SystemModule {}
