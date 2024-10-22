import { Inject, Provider } from '@nestjs/common'

import { AssetResourceRepository } from './repository'

export const AssetResourceRepo = () => Inject('AssetResourceRepo')

export const AssetResourceRepositoryProvider: Provider = {
  provide: 'AssetResourceRepo',
  useClass: AssetResourceRepository,
}
