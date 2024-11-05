import { Inject, Provider } from '@nestjs/common'

import { ProductRepository } from './repository'

export const ProductRepo = () => Inject('ProductRepo')

export const ProductRepositoryProvider: Provider = {
  provide: 'ProductRepo',
  useClass: ProductRepository,
}
