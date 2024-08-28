import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthUser } from '@/auth/user/entity'
import { AuthUserService } from '@/auth/user/service'
import { AuthUserAdminController } from '@/auth/user/controller.admin'

import { AuthRole } from '@/auth/role/entity'
import { AuthRoleService } from '@/auth/role/service'
import { AuthRoleAdminController } from '@/auth/role/controller.admin'

import { AuthLog } from '@/auth/log/entity'
import { AuthLogService } from '@/auth/log/service'
import { AuthLogAdminController } from '@/auth/log/controller.admin'

import { AuthGuard } from '@/auth/guard'
import { AuthListener } from '@/auth/listener'
import { AuthScheduler } from '@/auth/scheduler'

import { JwtModuleConfig } from '~/configs/modules'
import { WhoisService } from '~/services/whois'

@Module({
  imports: [

    TypeOrmModule.forFeature([
      AuthUser,
      AuthRole,
      AuthLog,
    ]),

    JwtModule.registerAsync({
      global: true,
      useClass: JwtModuleConfig,
    }),
  ],

  controllers: [
    AuthUserAdminController,
    AuthRoleAdminController,
    AuthLogAdminController,
  ],

  providers: [
    // Services
    WhoisService,

    AuthUserService,
    AuthRoleService,
    AuthLogService,

    // Listener
    AuthListener,

    // Scheduler
    AuthScheduler,

    // AuthGuard
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
