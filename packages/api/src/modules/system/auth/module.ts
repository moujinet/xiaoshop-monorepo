import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { WhoisService } from '~/services/whois'
import { JwtModuleConfig } from '~/configs/modules'
import { SystemSettingModule } from '@/system/setting/module'

import { SystemAuthGuard } from './guard'
import { SystemAuthListener } from './listener'
import { SystemRoleEntity } from './role/entity'
import { SystemUserEntity } from './user/entity'
import { SystemAuthScheduler } from './scheduler'
import { SystemUserAdminService } from './user/admin/service'
import { SystemRoleAdminService } from './role/admin/service'
import { SystemUserSessionService } from './user/session/service'
import { SystemUserAdminController } from './user/admin/controller'
import { SystemRoleAdminController } from './role/admin/controller'
import { SystemUserSessionController } from './user/session/controller'

@Module({
  imports: [
    forwardRef(() => SystemSettingModule),

    JwtModule.registerAsync({
      global: true,
      useClass: JwtModuleConfig,
    }),

    TypeOrmModule.forFeature([
      SystemUserEntity,
      SystemRoleEntity,
    ]),
  ],

  controllers: [
    SystemRoleAdminController,
    SystemUserAdminController,
    SystemUserSessionController,
  ],

  providers: [
    WhoisService,

    SystemRoleAdminService,
    SystemUserAdminService,
    SystemUserSessionService,

    SystemAuthListener,
    SystemAuthScheduler,

    {
      provide: APP_GUARD,
      useClass: SystemAuthGuard,
    },
  ],
})
export class SystemAuthModule {}
