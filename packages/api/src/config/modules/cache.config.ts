import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { redisStore } from 'cache-manager-redis-store'
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager'

@Injectable()
export class CacheModuleConfig implements CacheOptionsFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore as any,
      host: this.config.get<string>('redis.host'),
      port: this.config.get<number>('redis.port'),
      keyPrefix: this.config.get<string>('cache.keyPrefix'),
      database: this.config.get<number>('cache.db'),
      ttl: this.config.get<number>('cache.ttl'),
      max: this.config.get<number>('cache.max'),
      isGlobal: true,
    }
  }
}
