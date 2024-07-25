import { BullModuleOptions, type SharedBullConfigurationFactory } from '@nestjs/bull'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class QueueConfigService implements SharedBullConfigurationFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createSharedConfiguration(): BullModuleOptions {
    return {
      prefix: this.config.get<string>('queue.prefix'),
      redis: {
        host: this.config.get<string>('db.redis.host'),
        port: this.config.get<number>('db.redis.port'),
        db: this.config.get<number>('queue.redis.db'),
      },
    }
  }
}
