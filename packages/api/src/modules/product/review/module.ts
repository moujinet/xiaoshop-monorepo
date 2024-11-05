import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductReviewEntity } from './model/review/entity'
import { ProductReviewReplyEntity } from './model/reply/entity'
import { ProductReviewRepositoryProvider } from './model/review/provider'
import { ProductReviewReplyRepositoryProvider } from './model/reply/provider'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductReviewEntity,
      ProductReviewReplyEntity,
    ]),
  ],

  controllers: [],

  providers: [
    ProductReviewRepositoryProvider,
    ProductReviewReplyRepositoryProvider,
  ],

  exports: [],
})
export class ProductReviewModule {}
