import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { WhoisModule } from '~/services/whois/module'
import { SystemSettingModule } from '@/system/setting/module'

import { SystemAuthGuard } from './guard'
import { SystemAuthListener } from './listener'
import { SystemAuthScheduler } from './scheduler'
import { JwtModuleConfig } from './config/jwt.config'
import { SystemRoleEntity } from './model/role/entity'
import { SystemUserEntity } from './model/user/entity'
import { SystemRoleService } from './domain/role/service'
import { SystemUserService } from './domain/user/service'
import { SystemSessionService } from './domain/session/service'
import { SystemRoleRepositoryProvider } from './model/role/provider'
import { SystemUserRepositoryProvider } from './model/user/provider'
import { SystemRoleAdminController } from './controller/role/admin.controller'
import { SystemUserAdminController } from './controller/user/admin.controller'
import { SystemUserSessionController } from './controller/user/session.controller'

@Module({
  imports: [
    forwardRef(() => SystemSettingModule),

    forwardRef(() => WhoisModule),

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
    SystemUserSessionController,
    SystemUserAdminController,
    SystemRoleAdminController,
  ],

  providers: [
    SystemUserRepositoryProvider,
    SystemRoleRepositoryProvider,
    SystemSessionService,
    SystemRoleService,
    SystemUserService,

    SystemAuthScheduler,
    SystemAuthListener,

    {
      provide: APP_GUARD,
      useClass: SystemAuthGuard,
    },
  ],
})
export class SystemAuthModule {}
