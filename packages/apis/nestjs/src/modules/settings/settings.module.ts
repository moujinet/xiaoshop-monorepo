import { TypeOrmModule } from '@nestjs/typeorm'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { Settings } from '@/settings/settings.entity'
import { SettingsService } from '@/settings/settings.service'
import { SettingsAdminController } from '@/settings/settings.controller.admin'
import { ISettingsModuleOptions } from '@/settings/interface'
import { SETTINGS_OPTIONS } from '@/settings/constants'
import { StaffModule } from '@/staff/staff.module'

@Global()
@Module({})
export class SettingsModule {
  static register(options?: ISettingsModuleOptions): DynamicModule {
    return {
      module: SettingsModule,
      imports: [
        StaffModule,
        TypeOrmModule.forFeature([
          Settings,
        ]),
      ],
      controllers: [
        SettingsAdminController,
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
