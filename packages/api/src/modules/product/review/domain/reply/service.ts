import type { IProductReviewReplyRepository } from '@/product/review/model/reply/interface'

import { Inject, Injectable } from '@nestjs/common'

import { EventBusEmitter } from '~/services/event-bus/emitter'
import { ReplyProductReviewPayload } from '@/product/review/dto/payload'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { ProductReviewReplyRepo } from '@/product/review/model/reply/provider'

import {
  ProductReviewReplyCreateEvent,
  ProductReviewReplyDeleteEvent,
  ProductReviewReplyUpdateEvent,
} from './events'

@Injectable()
export class ProductReviewReplyService {
  constructor(
    @ProductReviewReplyRepo()
    private readonly repo: IProductReviewReplyRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 创建商品评价回复
   *
   * @param data 创建数据
   * @throws {FailedException} 创建商品评价回复失败
   */
  async create(data: ReplyProductReviewPayload) {
    try {
      const reply = await this.repo.create(data)

      this.event.emit(
        new ProductReviewReplyCreateEvent(
          reply.reviewId,
          reply.id,
          reply.content,
          reply.userId,
        ),
      )
    }
    catch (e) {
      throw new FailedException('创建商品评价回复', e.message, e.code)
    }
  }

  /**
   * 更新商品评价回复
   *
   * @param id 商品评价回复 ID
   * @param data 更新数据
   * @throws {FailedException} 更新商品评价回复失败
   * @throws {NotFoundException} 商品评价回复不存在
   */
  async update(id: number, data: ReplyProductReviewPayload) {
    try {
      const reply = await this.repo.findById(id)

      if (!reply)
        throw new NotFoundException('商品评价回复')

      const updated = await this.repo.update(reply, data)

      this.event.emit(
        new ProductReviewReplyUpdateEvent(
          updated.reviewId,
          updated.id,
          updated.content,
          updated.userId,
        ),
      )
    }
    catch (e) {
      throw new FailedException('更新商品评价回复', e.message, e.code)
    }
  }

  /**
   * 删除商品评价回复
   *
   * @param id 商品评价回复 ID
   * @throws {FailedException} 删除商品评价回复失败
   */
  async delete(id: number) {
    try {
      const reply = await this.repo.findById(id)

      if (reply) {
        await this.repo.destroy(reply.id)

        this.event.emit(
          new ProductReviewReplyDeleteEvent(
            reply.reviewId,
            reply.id,
            reply.content,
            reply.userId,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品评价回复', e.message)
    }
  }
}
