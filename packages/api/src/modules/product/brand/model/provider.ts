import { Inject, Provider } from '@nestjs/common'

import { ProductBrandRepository } from './repository'

export const ProductBrandRepo = () => Inject('ProductBrandRepo')

export const ProductBrandRepositoryProvider: Provider = {
  provide: 'ProductBrandRepo',
  useClass: ProductBrandRepository,
}
