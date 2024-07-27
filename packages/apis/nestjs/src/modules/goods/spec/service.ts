import { Enabled, type IGoodsSpec } from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Goods } from '@/goods/manage/entity'
import { GoodsSpec } from '@/goods/spec/entity'
import { GoodsSpecPayload } from '@/goods/spec/dto'
import { FailedException } from '~/common/exception'
import { nanoid } from '~/utils'

@Injectable()
export class GoodsSpecService {
  constructor(
    @InjectRepository(GoodsSpec)
    private readonly repository: Repository<GoodsSpec>,
  ) {
  }

  /**
   * 获取商品规格列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsSpec[]>
   * @see {@link IGoodsSpec}
   */
  async findList(goodsId: string): Promise<IGoodsSpec[]> {
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
      throw new FailedException('获取商品规格列表', e.message)
    }
  }

  /**
   * 更新商品规格
   *
   * @param {string} goodsId
   * @param {GoodsSpecPayload[]} data
   * @returns {Promise<IGoodsSpec[]>} 商品规格
   */
  async update(
    goodsId: string,
    data: GoodsSpecPayload[],
  ): Promise<IGoodsSpec[]> {
    try {
      const specs: GoodsSpec[] = []

      const goods = new Goods()
      goods.id = goodsId

      for (const spec of data) {
        const goodsSpec = new GoodsSpec()

        goodsSpec.id = spec.id || nanoid()
        goodsSpec.goods = goods
        goodsSpec.name = spec.name
        goodsSpec.enableImage = spec.enableImage || Enabled.NO
        goodsSpec.values = spec.values || []

        specs.push(goodsSpec)
      }

      return this.repository.save(specs, { transaction: true, chunk: 10 })
    }
    catch (e) {
      throw new FailedException('更新商品规格', e.message)
    }
  }

  /**
   * 复制商品规格
   *
   * @param fromId string
   * @param toId string
   * @returns Promise<IGoodsSpec[]>
   */
  async cloneTo(fromId: string, toId: string): Promise<IGoodsSpec[]> {
    try {
      const goodsSpecs = await this.findList(fromId)

      if (goodsSpecs.length > 0) {
        const specs: GoodsSpec[] = []
        const goods = new Goods()
        goods.id = toId

        for (const spec of goodsSpecs) {
          const goodsSpec = new GoodsSpec()

          goodsSpec.id = nanoid()
          goodsSpec.goods = goods
          goodsSpec.name = spec.name
          goodsSpec.enableImage = spec.enableImage || Enabled.NO
          goodsSpec.values = spec.values || []

          specs.push(goodsSpec)
        }

        return await this.repository.save(specs, { transaction: true, chunk: 10 })
      }
    }
    catch (e) {
      throw new FailedException('复制商品规格', e.message)
    }
  }
}
