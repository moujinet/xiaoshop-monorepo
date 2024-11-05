import type { IProductRepository } from '@/product/main/model/product/interface'

import { YesOrNo } from '@xiaoshop/shared'
import { Inject, Injectable } from '@nestjs/common'

import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { ProductRepo } from '@/product/main/model/product/provider'

import { ProductDeleteEvent, ProductRestoreEvent } from './events'

@Injectable()
export class ProductRecycleService {
  constructor(
    @ProductRepo()
    private readonly repo: IProductRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 恢复软删除商品
   *
   * @param id 商品 ID
   * @throws {FailedException} 恢复软删除商品失败
   */
  async restore(id: number) {
    try {
      const product = await this.repo.findById(
        id,
        ['id', 'connectId', 'name', 'isDeleted', 'deletedTime'],
      )

      if (product && product.isDeleted === YesOrNo.YES) {
        await this.repo.update(product, {
          isDeleted: YesOrNo.NO,
          deletedTime: null,
        })

        this.event.emit(
          new ProductRestoreEvent(
            product.id,
            product.connectId,
            product.name,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('恢复软删除商品', e.message, e.code)
    }
  }

  /**
   * 彻底删除商品
   *
   * @param id 商品 ID
   * @throws {FailedException} 彻底删除商品失败
   */
  async delete(id: number) {
    try {
      const product = await this.repo.findById(
        id,
        ['id', 'connectId', 'name', 'status', 'isDeleted'],
      )

      if (product && product.isDeleted === YesOrNo.YES) {
        await this.repo.destroy(id)

        this.event.emit(
          new ProductDeleteEvent(
            product.id,
            product.connectId,
            product.name,
            product.status,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('彻底删除商品', e.message, e.code)
    }
  }
}
