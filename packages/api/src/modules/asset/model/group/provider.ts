import { Inject, Provider } from '@nestjs/common'

import { AssetGroupRepository } from './repository'

export const AssetGroupRepo = () => Inject('AssetGroupRepo')

export const AssetGroupRepositoryProvider: Provider = {
  provide: 'AssetGroupRepo',
  useClass: AssetGroupRepository,
}
