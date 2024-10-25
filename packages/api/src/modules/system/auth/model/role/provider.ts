import { Inject, Provider } from '@nestjs/common'

import { SystemRoleRepository } from './repository'

export const SystemRoleRepo = () => Inject('SystemRoleRepo')

export const SystemRoleRepositoryProvider: Provider = {
  provide: 'SystemRoleRepo',
  useClass: SystemRoleRepository,
}
