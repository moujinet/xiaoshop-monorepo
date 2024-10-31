import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
    ]),

    forwardRef(() => SystemSettingModule),
  ],

  controllers: [],

  providers: [],

  exports: [],
})
export class LogisticDeliveryModule {}
