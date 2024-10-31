import { Inject, Provider } from '@nestjs/common'

import { LogisticAddressRepository } from './repository'

export const LogisticAddressRepo = () => Inject('LogisticAddressRepo')

export const LogisticAddressRepositoryProvider: Provider = {
  provide: 'LogisticAddressRepo',
  useClass: LogisticAddressRepository,
}
