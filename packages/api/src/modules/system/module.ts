import { Module } from '@nestjs/common'

import { SystemLogModule } from './log/module'
import { SystemAuthModule } from './auth/module'
import { SystemDictModule } from './dict/module'
import { SystemSettingModule } from './setting/module'

@Module({
  imports: [
    SystemSettingModule,
    SystemAuthModule,
    SystemLogModule,
    SystemDictModule,
  ],
})
export class SystemModule {}
