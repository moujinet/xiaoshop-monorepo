import {
  type IProductSkuInfo,
  ProductStatus,
  YesOrNo,
} from '@xiaoshop/shared'
import { InjectRepository } from '@nestjs/typeorm'
import { MoreThan, Raw, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ProductSkuInventoryWarningEvent } from '@/product/sku/events'
import { ProductSku } from '@/product/sku/entity'
import { FailedException } from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'
import { unique } from '~/utils'

@Injectable()
export class ProductSkuService {
  constructor(
    @InjectRepository(ProductSku)
    private readonly repository: Repository<ProductSku>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品 SKU 列表
   *
   * @param productId 商品 ID
   * @returns Promise<IProductSkuInfo[]>
   * @throws {FailedException} 获取商品 SKU 列表失败
   */
  async findListByProduct(productId: number): Promise<IProductSkuInfo[]> {
    try {
      return await this.repository.find({
        select: [
          'id',
          'connectId',
          'productId',
          'productConnectId',
          'skuCode',
          'name',
          'attributes',
          'image',
          'price',
          'originalPrice',
          'costPrice',
          'inventory',
          'inventoryEarlyWarning',
          'weight',
          'volume',
          'sales',
          'unit',
        ],
        where: { productId },
        order: { sales: 'DESC' },
      })
    }
    catch (e) {
      throw new FailedException('获取商品 SKU 列表', e.message)
    }
  }

  /**
   * 更新库存预警 (定时任务)
   *
   * @returns Promise<number[]>
   * @event ProductSkuInventoryWarningEvent
   */
  async updateInventoryWarning(): Promise<number[]> {
    try {
      const skus = await this.repository.find({
        select: {
          productId: true,
          skuCode: true,
          inventory: true,
          product: { name: true },
        },
        where: {
          product: {
            isDeleted: YesOrNo.NO,
            status: ProductStatus.ON_SALE,
            isWarning: YesOrNo.NO,
          },
          inventoryEarlyWarning: MoreThan(0),
          inventory: Raw(alias => `${alias} < inventory_early_warning`),
        },
      })

      if (skus.length === 0)
        return

      const uniqueIds = unique(skus.map(sku => sku.productId))
      const emitIds: number[] = []

      for (const sku of skus) {
        if (!emitIds.includes(sku.productId)) {
          emitIds.push(sku.productId)

          this.event.emit(
            toEventName(ProductSkuInventoryWarningEvent.name),
            new ProductSkuInventoryWarningEvent(
              sku.productConnectId,
              sku.product.name,
              sku.skuCode,
              sku.inventory,
            ),
          )
        }
      }

      return uniqueIds
    }
    catch (e) {
      throw new FailedException('更新库存预警', e.message)
    }
  }
}
