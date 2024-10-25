import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TypeOrmModuleConfig implements TypeOrmOptionsFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const ormconfig = this.config.get('mysql')

    return {
      ...ormconfig,
      timezone: 'Z',
      keepConnectionAlive: false,
      entities: [
        `${__dirname}/**/entity{.ts,.js}`,
        `${__dirname}/**/*.entity{.ts,.js}`,
      ],
    }
  }
}
