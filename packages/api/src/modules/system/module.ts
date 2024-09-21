import { forwardRef, Module } from '@nestjs/common'

import { SystemLogModule } from './log/module'
import { SystemAuthModule } from './auth/module'
import { SystemDictModule } from './dict/module'
import { SystemMessageModule } from './message/module'
import { SystemMonitorModule } from './monitor/module'
import { SystemSettingsModule } from './settings/module'
import { SystemOrganizeModule } from './organize/module'

@Module({
  imports: [
    forwardRef(() => SystemDictModule),
    forwardRef(() => SystemSettingsModule),
    forwardRef(() => SystemLogModule),
    forwardRef(() => SystemOrganizeModule),
    forwardRef(() => SystemAuthModule),
    forwardRef(() => SystemMessageModule),
    forwardRef(() => SystemMonitorModule),
  ],
})
export class SystemModule {}
