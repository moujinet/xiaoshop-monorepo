import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BullModuleOptions, type SharedBullConfigurationFactory } from '@nestjs/bull'

@Injectable()
export class BullModuleConfig implements SharedBullConfigurationFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createSharedConfiguration(): BullModuleOptions {
    return {
      prefix: this.config.get<string>('queue.prefix'),
      redis: {
        host: this.config.get<string>('redis.host'),
        port: this.config.get<number>('redis.port'),
        db: this.config.get<number>('queue.db'),
      },
    }
  }
}
