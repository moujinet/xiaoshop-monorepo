import { Inject, Provider } from '@nestjs/common'

import { ProductCategoryRepository } from './repository'

export const ProductCategoryRepo = () => Inject('ProductCategoryRepo')

export const ProductCategoryRepositoryProvider: Provider = {
  provide: 'ProductCategoryRepo',
  useClass: ProductCategoryRepository,
}
