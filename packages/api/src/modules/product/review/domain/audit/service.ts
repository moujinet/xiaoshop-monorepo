import type { IProductReviewRepository } from '@/product/review/model/review/interface'

import { Inject, Injectable } from '@nestjs/common'
import { ProductReviewStatus } from '@xiaoshop/shared'

import { EventBusEmitter } from '~/services/event-bus/emitter'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { ProductReviewRepo } from '@/product/review/model/review/provider'

import { ProductReviewApproveEvent } from './events'

@Injectable()
export class ProductAuditService {
  constructor(
    @ProductReviewRepo()
    private readonly repo: IProductReviewRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 通过评价审核
   *
   * @param id 商品评价 ID
   * @throws {NotFoundException} 商品评价不存在
   * @throws {FailedException} 商品评价审核失败
   */
  async approve(id: number) {
    try {
      const review = await this.repo.findById(id)

      if (!review)
        throw new NotFoundException('商品评价')

      if (review.status === ProductReviewStatus.APPROVED)
        return

      await this.repo.update(review, {
        status: ProductReviewStatus.APPROVED,
      })

      this.event.emit(
        new ProductReviewApproveEvent(
          review.product.id,
          review.product.name,
          review.id,
          review.content,
          review.memberId,
        ),
      )
    }
    catch (e) {
      throw new FailedException('商品评价审核', e.message, e.code)
    }
  }

  /**
   * 驳回评价审核
   *
   * @param id 商品评价 ID
   * @throws {NotFoundException} 商品评价不存在
   * @throws {FailedException} 商品评价审核失败
   */
  async reject(id: number) {
    try {
      const review = await this.repo.findById(id)

      if (!review)
        throw new NotFoundException('商品评价')

      if (review.status === ProductReviewStatus.REJECTED)
        return

      await this.repo.update(review, {
        status: ProductReviewStatus.REJECTED,
      })

      this.event.emit(
        new ProductReviewApproveEvent(
          review.product.id,
          review.product.name,
          review.id,
          review.content,
          review.memberId,
        ),
      )
    }
    catch (e) {
      throw new FailedException('商品评价审核', e.message, e.code)
    }
  }
}
