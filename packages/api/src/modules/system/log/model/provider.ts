import { Inject, Provider } from '@nestjs/common'

import { SystemLogRepository } from './repository'

export const SystemLogRepo = () => Inject('SystemLogRepo')

export const SystemLogRepositoryProvider: Provider = {
  provide: 'SystemLogRepo',
  useClass: SystemLogRepository,
}
