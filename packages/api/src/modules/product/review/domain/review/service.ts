import type { IApiPaginationData, IProductReviewInfo } from '@xiaoshop/shared'
import type { IProductReviewRepository } from '@/product/review/model/review/interface'

import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { toProductReviewList } from '@/product/review/model/review/mapper'
import { ProductReviewRepo } from '@/product/review/model/review/provider'
import { GetProductReviewPagesRequest } from '@/product/review/dto/request'

@Injectable()
export class ProductReviewService {
  constructor(
    @ProductReviewRepo()
    private readonly repo: IProductReviewRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商品评价分页列表
   *
   * @param query 查询条件
   * @returns 商品评价分页列表
   * @throws {FailedException} 获取商品评价分页列表失败
   */
  async findPages(
    query: GetProductReviewPagesRequest,
  ): Promise<IApiPaginationData<IProductReviewInfo>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount({}, page, pagesize).then(
        ({ list, total, page, pagesize }) => ({
          list: toProductReviewList(list),
          total,
          page,
          pagesize,
        }),
      )
    }
    catch (e) {
      throw new FailedException('获取商品评价分页列表', e.message)
    }
  }
}
