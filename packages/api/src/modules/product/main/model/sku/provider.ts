import { Inject, Provider } from '@nestjs/common'

import { ProductSkuRepository } from './repository'

export const ProductSkuRepo = () => Inject('ProductSkuRepo')

export const ProductSkuRepositoryProvider: Provider = {
  provide: 'ProductSkuRepo',
  useClass: ProductSkuRepository,
}
