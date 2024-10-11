import { Inject, Provider } from '@nestjs/common'

import { SystemUserRepository } from './repository'

export const SystemUserRepo = () => Inject('SystemUserRepo')

export const SystemUserRepositoryProvider: Provider = {
  provide: 'SystemUserRepo',
  useClass: SystemUserRepository,
}
