import { Inject, Provider } from '@nestjs/common'

import { ProductServiceAdditionRepository } from './repository'

export const ProductServiceAdditionRepo = () => Inject('ProductServiceAdditionRepo')

export const ProductServiceAdditionRepositoryProvider: Provider = {
  provide: 'ProductServiceAdditionRepo',
  useClass: ProductServiceAdditionRepository,
}
