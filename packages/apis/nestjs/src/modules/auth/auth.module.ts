import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'

import { AuthGuard } from '@/auth/auth.guard'
import { AuthService } from '@/auth/auth.service'
import { AuthAdminController } from '@/auth/controllers/admin.controller'

import { StaffModule } from '@/staff/staff.module'

import { JwtConfigService } from '~/configs/modules/jwt.config'

@Module({
  imports: [
    StaffModule,

    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfigService,
    }),
  ],

  controllers: [
    AuthAdminController,
  ],

  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],

  exports: [
    AuthService,
  ],
})
export class AuthModule {}
