import { forwardRef, Module } from '@nestjs/common'

import { SystemLogModule } from './log/module'
import { SystemAuthModule } from './auth/module'
import { SystemMessageModule } from './message/module'
import { SystemSettingsModule } from './settings/module'
import { SystemOrganizeModule } from './organize/module'

@Module({
  imports: [
    forwardRef(() => SystemSettingsModule),
    forwardRef(() => SystemLogModule),
    forwardRef(() => SystemOrganizeModule),
    forwardRef(() => SystemAuthModule),
    forwardRef(() => SystemMessageModule),
  ],
})
export class SystemModule {}
