import { Inject, Provider } from '@nestjs/common'

import { LogisticExpressRepository } from './repository'

export const LogisticExpressRepo = () => Inject('LogisticExpressRepo')

export const LogisticExpressRepositoryProvider: Provider = {
  provide: 'LogisticExpressRepo',
  useClass: LogisticExpressRepository,
}
