import type {
  IProductSkuRepository,
  IProductSkuSelect,
  IProductSkuWhere,
} from './interface'

import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { nano, uuid } from '~/utils/uuid'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'

import { ProductSkuEntity } from './entity'

@Injectable()
export class ProductSkuRepository implements IProductSkuRepository {
  constructor(
    @InjectRepository(ProductSkuEntity)
    private readonly repo: Repository<ProductSkuEntity>,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,
  ) {}

  /**
   * @inheritdoc
   */
  async find(
    where: IProductSkuWhere,
    select?: IProductSkuSelect,
  ) {
    return await this.repo.find({
      select,
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IProductSkuWhere,
    select?: IProductSkuSelect,
  ) {
    return await this.repo.findOne({
      select,
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select?: IProductSkuSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductSkuWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(rows: Partial<ProductSkuEntity>[]) {
    const defaults = await this.setting.find('product.defaults.*')

    const entities = rows.map((row: Partial<ProductSkuEntity>) => {
      return this.newEntity({
        productId: row.productId,
        productConnectId: row.productConnectId,
        connectId: row.connectId || uuid(),
        skuCode: row.skuCode || `${row.productId}-${nano(6)}`,
        name: row.name ? row.name.trim() : '',
        image: row.image ? row.image.trim() : '',
        attributes: row.attributes || [],
        price: row.price || 0,
        originalPrice: row.originalPrice || 0,
        costPrice: row.costPrice || 0,
        quantity: row.quantity || defaults['product.defaults.quantity'] || 0,
        threshold: row.threshold || defaults['product.defaults.threshold'] || 0,
        weight: row.weight || 0,
        volume: row.volume || 0,
        unit: row.unit || defaults['product.defaults.unit'] || '',
      })
    })

    return await this.repo.save(entities, {
      transaction: true,
      chunk: 100,
    })
  }

  /**
   * @inheritdoc
   */
  async update(
    skus: ProductSkuEntity[],
    rows: Partial<ProductSkuEntity>[],
  ) {
    const result: ProductSkuEntity[] = []

    const newSkus = rows.filter(row => !row.id)

    if (newSkus.length > 0)
      result.concat(await this.create(newSkus))

    const updateSkus = rows.filter(row => row.id)

    if (updateSkus.length > 0) {
      const updateEntities = updateSkus.map((sku) => {
        return this.newEntity({
          ...sku,
          skuCode: sku.skuCode || `${sku.productId}-${nano(6)}`,
        })
      })

      result.concat(await this.repo.save(updateEntities, {
        transaction: true,
        chunk: 100,
      }))
    }

    const deleteSkus = skus.filter(
      sku => !rows.find(row => row.id === sku.id),
    )

    if (deleteSkus.length > 0) {
      await this.repo.remove(deleteSkus, {
        transaction: true,
        chunk: 100,
      })
    }

    return result
  }

  /**
   * @inheritdoc
   */
  newEntity(entity?: DeepPartial<ProductSkuEntity>): ProductSkuEntity {
    return this.repo.create(entity)
  }
}
