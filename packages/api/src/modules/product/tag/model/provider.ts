import { Inject, Provider } from '@nestjs/common'

import { ProductTagRepository } from './repository'

export const ProductTagRepo = () => Inject('ProductTagRepo')

export const ProductTagRepositoryProvider: Provider = {
  provide: 'ProductTagRepo',
  useClass: ProductTagRepository,
}
