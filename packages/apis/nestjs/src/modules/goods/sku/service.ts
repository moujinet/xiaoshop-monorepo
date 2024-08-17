import type { IGoodsSku, IGoodsSpec } from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Goods } from '@/goods/manage/entity'
import { GoodsSku } from '@/goods/sku/entity'
import { GoodsSkuPayload } from '@/goods/sku/dto'
import { FailedException } from '~/common/exception'
import { nanoNumber, nanoSkuCode, nanoid } from '~/utils'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class GoodsSkuService {
  constructor(
    @InjectRepository(GoodsSku)
    private readonly repository: Repository<GoodsSku>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {
  }

  /**
   * 获取商品 SKU 列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsSku[]>
   * @see {@link IGoodsSku}
   */
  async findList(goodsId: string): Promise<IGoodsSku[]> {
    try {
      return await this.repository.find({
        where: {
          goods: { id: goodsId },
        },
        order: {
          id: 'ASC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品 SKU 列表', e.message)
    }
  }

  /**
   * 更新商品 SKU 列表
   *
   * @param {string} goodsId
   * @param {GoodsSkuPayload[]} data
   * @returns Promise<void>
   */
  async update(
    goodsId: string,
    data: GoodsSkuPayload[],
    skuCode?: string,
  ) {
    try {
      const skus: GoodsSku[] = []
      const goods = new Goods()
      goods.id = goodsId

      for (const sku of data) {
        const goodsSku = new GoodsSku()

        goodsSku.id = sku.id || nanoid()
        goodsSku.goods = goods
        goodsSku.skuCode = sku.skuCode || nanoSkuCode(skuCode)
        goodsSku.name = sku.name
        goodsSku.image = sku.image || ''
        goodsSku.price = sku.price || 0
        goodsSku.originalPrice = sku.originalPrice || 0
        goodsSku.costPrice = sku.costPrice || 0
        goodsSku.inventory = sku.inventory || 0
        goodsSku.inventoryEarlyWarning = sku.inventoryEarlyWarning || 0
        goodsSku.weight = sku.weight || 0
        goodsSku.volume = sku.volume || 0
        goodsSku.specs = sku.specs

        skus.push(goodsSku)
      }

      await this.repository.save(skus, { transaction: true, chunk: 10 })
      await this.log.write('商品管理', `更新商品规格「${goodsId}」`)
    }
    catch (e) {
      throw new FailedException('更新商品规格', e.message)
    }
  }

  /**
   * 复制商品多规格
   *
   * @param fromId string
   * @param toId string
   * @param specs IGoodsSpec[]
   */
  async cloneTo(
    fromId: string,
    toId: string,
    specs: IGoodsSpec[],
  ) {
    try {
      const goodsSkus = await this.findList(fromId)

      if (goodsSkus.length > 0) {
        const skus: GoodsSku[] = []
        const goods = new Goods()
        goods.id = toId

        for (const sku of goodsSkus) {
          const goodsSku = new GoodsSku()

          goodsSku.id = nanoid()
          goodsSku.goods = goods
          goodsSku.skuCode = nanoNumber()
          goodsSku.name = sku.name
          goodsSku.image = sku.image || ''
          goodsSku.price = sku.price || 0
          goodsSku.originalPrice = sku.originalPrice || 0
          goodsSku.costPrice = sku.costPrice || 0
          goodsSku.inventory = sku.inventory || 0
          goodsSku.inventoryEarlyWarning = sku.inventoryEarlyWarning || 0
          goodsSku.weight = sku.weight || 0
          goodsSku.volume = sku.volume || 0
          goodsSku.sales = 0

          goodsSku.specs = []

          sku.specs.forEach((spec) => {
            const goodsSpec = specs.find(item => item.name === spec.name)

            goodsSku.specs.push({
              ...spec,
              specId: goodsSpec.id,
            })
          })

          skus.push(goodsSku)
        }

        await this.repository.save(skus, { transaction: true, chunk: 10 })
      }
    }
    catch (e) {
      throw new FailedException('更新商品规格', e.message)
    }
  }
}
