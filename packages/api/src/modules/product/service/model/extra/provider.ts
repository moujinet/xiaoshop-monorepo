import { Inject, Provider } from '@nestjs/common'

import { ProductServiceExtraRepository } from './repository'

export const ProductServiceExtraRepo = () => Inject('ProductServiceExtraRepo')

export const ProductServiceExtraRepositoryProvider: Provider = {
  provide: 'ProductServiceExtraRepo',
  useClass: ProductServiceExtraRepository,
}
