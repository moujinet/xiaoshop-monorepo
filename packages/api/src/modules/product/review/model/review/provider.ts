import { Inject, Provider } from '@nestjs/common'

import { ProductReviewRepository } from './repository'

export const ProductReviewRepo = () => Inject('ProductReviewRepo')

export const ProductReviewRepositoryProvider: Provider = {
  provide: 'ProductReviewRepo',
  useClass: ProductReviewRepository,
}
