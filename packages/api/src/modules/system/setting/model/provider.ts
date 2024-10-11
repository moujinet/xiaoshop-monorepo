import { Inject, Provider } from '@nestjs/common'

import { SystemSettingRepository } from './repository'

export const SystemSettingRepo = () => Inject('SystemSettingRepo')

export const SystemSettingRepositoryProvider: Provider = {
  provide: 'SystemSettingRepo',
  useClass: SystemSettingRepository,
}
