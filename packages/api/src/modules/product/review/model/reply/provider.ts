import { Inject, Provider } from '@nestjs/common'

import { ProductReviewReplyRepository } from './repository'

export const ProductReviewReplyRepo = () => Inject('ProductReviewReplyRepo')

export const ProductReviewReplyRepositoryProvider: Provider = {
  provide: 'ProductReviewReplyRepo',
  useClass: ProductReviewReplyRepository,
}
