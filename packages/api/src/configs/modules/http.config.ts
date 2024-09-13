import type {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
} from '@nestjs/axios'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class HttpModuleConfig implements HttpModuleOptionsFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: this.config.get<number>('http.timeout'),
      maxRedirects: this.config.get<number>('http.maxRedirects'),
    }
  }
}
