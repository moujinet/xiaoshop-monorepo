import type {
  IProductRelations,
  IProductRepository,
  IProductSelect,
  IProductWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {
  ProductBuyBtnType,
  ProductFreightChargeMode,
  ProductPublishMode,
  ProductReturnsFreightBy,
  ProductSource,
  ProductStatus,
  ProductType,
  YesOrNo,
} from '@xiaoshop/shared'

import { uuid } from '~/utils/uuid'
import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'
import { PRODUCT_DEFAULT_BUY_BTN_NAME } from '@/product/constants'

import { ProductEntity } from './entity'

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: IProductWhere,
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: {
        id: true,
        connectId: true,
        status: true,
        type: true,
        source: true,
        name: true,
        slogan: true,
        images: true,
        categories: { id: true, parentId: true, name: true },
        tags: { id: true, name: true, color: true },
        groups: { id: true, name: true },
        brand: { id: true, name: true },
        price: true,
        inventory: true,
        sales: true,
        sort: true,
        onSaleTime: true,
      },
      where,
      relations: ['categories', 'tags', 'groups', 'brand'],
      skip,
      take,
      order: {
        sort: 'ASC',
        onSaleTime: 'DESC',
      },
    })

    return {
      list,
      total,
      page,
      pagesize: take,
    }
  }

  /**
   * @inheritdoc
   */
  async find(
    where: IProductWhere,
    select?: IProductSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      relations: this.newRelations(select),
      order: {
        sort: 'ASC',
        onSaleTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IProductWhere,
    select?: IProductSelect,
  ) {
    return await this.repo.findOne({
      select,
      where,
      relations: this.newRelations(select),
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select?: IProductSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
      relations: this.newRelations(select),
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductEntity>) {
    const product = this.newEntity()

    product.connectId = uuid()
    product.type = data.type || ProductType.ENTITY
    product.status = data.status || ProductStatus.DRAFT
    product.source = data.source || ProductSource.MANUAL
    product.publishMode = data.publishMode || ProductPublishMode.DIRECT
    product.freightChargeMode = data.freightChargeMode || ProductFreightChargeMode.TEMPLATE
    product.returnsFreightBy = data.returnsFreightBy || ProductReturnsFreightBy.BUYER
    product.autoOnSaleAt = data.autoOnSaleAt || null

    product.name = data.name ? data.name.trim() : ''
    product.desc = data.desc ? data.desc.trim() : ''
    product.slogan = data.slogan ? data.slogan.trim() : ''
    product.content = data.content ? data.content.trim() : ''
    product.video = data.video ? data.video.trim() : ''

    product.limitsMaxQty = data.limitsMaxQty || 0
    product.limitsMinQty = data.limitsMinQty || 1
    product.brandId = data.brandId || 0
    product.sort = data.sort || 1
    product.freight = data.freight || 0
    product.freightTemplateId = data.freightTemplateId || 0

    product.isEnableVipDiscount = data.isEnableVipDiscount || YesOrNo.YES
    product.isEnableLimits = data.isEnableLimits || YesOrNo.NO
    product.isMultiSkus = data.isMultiSkus || YesOrNo.NO
    product.buyBtnNameType = data.buyBtnNameType || ProductBuyBtnType.DEFAULT
    product.buyBtnName = data.buyBtnName ? data.buyBtnName.trim() : PRODUCT_DEFAULT_BUY_BTN_NAME

    product.images = data.images || []
    product.attributes = data.attributes || []
    product.categories = data.categories || []
    product.tags = data.tags || []
    product.groups = data.groups || []
    product.additions = data.additions || []
    product.extras = data.extras || []
    product.deliveryMethods = data.deliveryMethods || []

    product.isWarning = YesOrNo.NO
    product.isDeleted = YesOrNo.NO

    return await this.repo.save(product)
  }

  /**
   * @inheritdoc
   */
  async update(
    product: ProductEntity,
    data: Partial<ProductEntity>,
  ) {
    const entity = this.newEntity({
      id: product.id,
      connectId: product.connectId,
    })

    if (data.status !== undefined && data.status !== product.status)
      entity.status = data.status

    if (data.name && data.name.trim() !== product.name)
      entity.name = data.name.trim()

    if (data.desc && data.desc.trim() !== product.desc)
      entity.desc = data.desc.trim()

    if (data.slogan && data.slogan.trim() !== product.slogan)
      entity.slogan = data.slogan.trim()

    if (data.images && data.images !== product.images)
      entity.images = data.images

    if (data.video && data.video !== product.video)
      entity.video = data.video

    if (data.content && data.content.trim() !== product.content)
      entity.content = data.content.trim()

    if (data.attributes && data.attributes !== product.attributes)
      entity.attributes = data.attributes

    if (data.categories && data.categories !== product.categories)
      entity.categories = data.categories

    if (data.tags && data.tags !== product.tags)
      entity.tags = data.tags

    if (data.groups && data.groups !== product.groups)
      entity.groups = data.groups

    if (data.additions && data.additions !== product.additions)
      entity.additions = data.additions

    if (data.extras && data.extras !== product.extras)
      entity.extras = data.extras

    if (data.brand && data.brand !== product.brand)
      entity.brand = data.brand

    if (data.buyBtnName && data.buyBtnName.trim() !== product.buyBtnName)
      entity.buyBtnName = data.buyBtnName.trim()

    if (data.isEnableVipDiscount !== undefined && data.isEnableVipDiscount !== product.isEnableVipDiscount)
      entity.isEnableVipDiscount = data.isEnableVipDiscount

    if (data.isEnableLimits !== undefined && data.isEnableLimits !== product.isEnableLimits)
      entity.isEnableLimits = data.isEnableLimits

    if (data.isMultiSkus !== undefined && data.isMultiSkus !== product.isMultiSkus)
      entity.isMultiSkus = data.isMultiSkus

    if (data.isWarning !== undefined && data.isWarning !== product.isWarning)
      entity.isWarning = data.isWarning

    if (data.isDeleted !== undefined && data.isDeleted !== product.isDeleted)
      entity.isDeleted = data.isDeleted

    if (data.limitsMaxQty !== undefined && data.limitsMaxQty !== product.limitsMaxQty)
      entity.limitsMaxQty = data.limitsMaxQty

    if (data.limitsMinQty !== undefined && data.limitsMinQty !== product.limitsMinQty)
      entity.limitsMinQty = data.limitsMinQty

    if (data.buyBtnNameType !== undefined && data.buyBtnNameType !== product.buyBtnNameType)
      entity.buyBtnNameType = data.buyBtnNameType

    if (data.price !== undefined && data.price !== product.price)
      entity.price = data.price

    if (data.inventory !== undefined && data.inventory !== product.inventory)
      entity.inventory = data.inventory

    if (data.sort !== undefined && data.sort !== product.sort)
      entity.sort = data.sort

    if (data.sales !== undefined && data.sales !== product.sales)
      entity.sales = data.sales

    if (data.views !== undefined && data.views !== product.views)
      entity.views = data.views

    if (data.favorites !== undefined && data.favorites !== product.favorites)
      entity.favorites = data.favorites

    if (data.publishMode !== undefined && data.publishMode !== product.publishMode)
      entity.publishMode = data.publishMode

    if (data.autoOnSaleAt !== undefined && data.autoOnSaleAt !== product.autoOnSaleAt)
      entity.autoOnSaleAt = data.autoOnSaleAt

    if (data.overallScore !== undefined && data.overallScore !== product.overallScore)
      entity.overallScore = data.overallScore

    if (data.overallProductScore !== undefined && data.overallProductScore !== product.overallProductScore)
      entity.overallProductScore = data.overallProductScore

    if (data.overallServiceScore !== undefined && data.overallServiceScore !== product.overallServiceScore)
      entity.overallServiceScore = data.overallServiceScore

    if (data.overallLogisticsScore !== undefined && data.overallLogisticsScore !== product.overallLogisticsScore)
      entity.overallLogisticsScore = data.overallLogisticsScore

    if (data.deliveryMethods !== undefined && data.deliveryMethods !== product.deliveryMethods)
      entity.deliveryMethods = data.deliveryMethods

    if (data.freightChargeMode !== undefined && data.freightChargeMode !== product.freightChargeMode)
      entity.freightChargeMode = data.freightChargeMode

    if (data.freight !== undefined && data.freight !== product.freight)
      entity.freight = data.freight

    if (data.freightTemplateId !== undefined && data.freightTemplateId !== product.freightTemplateId)
      entity.freightTemplateId = data.freightTemplateId

    if (data.returnsFreightBy !== undefined && data.returnsFreightBy !== product.returnsFreightBy)
      entity.returnsFreightBy = data.returnsFreightBy

    if (data.onSaleTime && data.onSaleTime !== product.onSaleTime)
      entity.onSaleTime = data.onSaleTime

    if (data.stockedTime && data.stockedTime !== product.stockedTime)
      entity.stockedTime = data.stockedTime

    if (data.soldOutTime && data.soldOutTime !== product.soldOutTime)
      entity.soldOutTime = data.soldOutTime

    if (data.deletedTime && data.deletedTime !== product.deletedTime)
      entity.deletedTime = data.deletedTime

    return await this.repo.save(product)
  }

  /**
   * @inheritdoc
   */
  async updateMany(data: Partial<ProductEntity>[]) {
    return await this.repo.save(data, {
      transaction: true,
      chunk: 100,
    })
  }

  /**
   * @inheritdoc
   */
  async destroy(id: number) {
    await this.repo.delete(id)
  }

  /**
   * @inheritdoc
   */
  newEntity(entity?: DeepPartial<ProductEntity>): ProductEntity {
    return this.repo.create(entity)
  }

  /**
   * 根据选择字段生成查询关系
   *
   * @param select 选择字段
   * @returns 查询关系
   */
  newRelations(select?: IProductSelect) {
    const relations: IProductRelations = []
    const allRelations = [
      'categories',
      'tags',
      'groups',
      'brand',
      'additions',
      'extras',
      'skus',
    ] as const

    if (!select) {
      relations.push(...allRelations)
    }
    else {
      for (const relation of allRelations) {
        if (Array.isArray(select) && select.filter(item => item === relation).length > 0) {
          relations.push(relation)
        }
        else if (relation in select) {
          relations.push(relation)
        }
      }
    }

    return relations
  }
}
