import { Module } from '@nestjs/common'

import { LogisticAddressModule } from './address/module'
import { LogisticFreightModule } from './freight/module'
import { LogisticExpressModule } from './express/module'
import { LogisticDeliveryModule } from './delivery/module'

@Module({
  imports: [
    LogisticAddressModule,
    LogisticDeliveryModule,
    LogisticExpressModule,
    LogisticFreightModule,
  ],
})
export class LogisticModule {}
