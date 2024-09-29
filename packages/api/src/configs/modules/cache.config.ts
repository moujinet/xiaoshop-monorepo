import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CacheModuleOptions, type CacheOptionsFactory } from '@nestjs/cache-manager'

import { redisStore } from './redis/store'

@Injectable()
export class CacheModuleConfig implements CacheOptionsFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: this.config.get<string>('db.redis.host'),
      port: this.config.get<number>('db.redis.port'),
      keyPrefix: this.config.get<string>('cache.keyPrefix'),
      database: this.config.get<number>('cache.db'),
      ttl: this.config.get<number>('cache.ttl'),
      max: this.config.get<number>('cache.max'),
      isGlobal: true,
    }
  }
}
