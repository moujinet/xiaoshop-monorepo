import { TypeOrmModule } from '@nestjs/typeorm'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { Settings } from '@/settings/settings.entity'
import { SettingsService } from '@/settings/settings.service'
import { SettingsController } from '@/settings/settings.controller'
import { ISettingsModuleOptions } from '@/settings/interface'
import { SETTINGS_OPTIONS } from '@/settings/constants'

@Global()
@Module({})
export class SettingsModule {
  static register(options?: ISettingsModuleOptions): DynamicModule {
    return {
      module: SettingsModule,
      imports: [
        TypeOrmModule.forFeature([
          Settings,
        ]),
      ],
      controllers: [
        SettingsController,
      ],
      providers: [
        {
          provide: SETTINGS_OPTIONS,
          useValue: options,
        },
        SettingsService,
      ],
      exports: [
        SettingsService,
      ],
    }
  }
}
