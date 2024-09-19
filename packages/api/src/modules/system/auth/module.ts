import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { WhoisService } from '~/services/whois'
import { JwtModuleConfig } from '~/configs/modules'
import { SystemSettingsModule } from '@/system/settings/module'

import { SystemAuthGuard } from './guard'
import { SystemUser } from './user/entity'
import { SystemRole } from './role/entity'
import { SystemAuthListener } from './listener'
import { SystemAuthScheduler } from './scheduler'
import { SystemRoleService } from './role/service'
import { SystemUserService } from './user/service'
import { SystemRoleAdminController } from './role/controller.admin'
import { SystemUserAdminController } from './user/controller.admin'

@Module({
  imports: [
    forwardRef(() => SystemSettingsModule),

    JwtModule.registerAsync({
      global: true,
      useClass: JwtModuleConfig,
    }),

    TypeOrmModule.forFeature([
      SystemUser,
      SystemRole,
    ]),
  ],

  controllers: [
    SystemUserAdminController,
    SystemRoleAdminController,
  ],

  providers: [
    WhoisService,

    SystemUserService,
    SystemRoleService,

    SystemAuthListener,
    SystemAuthScheduler,

    {
      provide: APP_GUARD,
      useClass: SystemAuthGuard,
    },
  ],
})
export class SystemAuthModule {}
