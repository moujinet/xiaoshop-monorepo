import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configs = this.config.get<TypeOrmModuleOptions>('db.mysql')

    return {
      ...configs,
      keepConnectionAlive: true,
      entities: [
        `${__dirname}/**/entity{.ts,.js}`,
        `${__dirname}/**/*.entity{.ts,.js}`,
      ],
    }
  }
}
