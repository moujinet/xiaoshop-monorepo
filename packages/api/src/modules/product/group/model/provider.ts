import { Inject, Provider } from '@nestjs/common'

import { ProductGroupRepository } from './repository'

export const ProductGroupRepo = () => Inject('ProductGroupRepo')

export const ProductGroupRepositoryProvider: Provider = {
  provide: 'ProductGroupRepo',
  useClass: ProductGroupRepository,
}
