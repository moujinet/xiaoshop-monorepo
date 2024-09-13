import type { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtModuleConfig implements JwtOptionsFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.get<string>('jwt.secret'),
      signOptions: {
        expiresIn: this.config.get<string>('jwt.expiresIn'),
      },
    }
  }
}
