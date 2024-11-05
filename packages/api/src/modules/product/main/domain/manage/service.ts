import type { IProductTagRepository } from '@/product/tag/model/interface'
import type { IProductGroupRepository } from '@/product/group/model/interface'
import type { IProductSkuRepository } from '@/product/main/model/sku/interface'
import type { IProductRepository } from '@/product/main/model/product/interface'
import type { IProductCategoryRepository } from '@/product/category/model/interface'
import type { IProductServiceExtraRepository } from '@/product/service/model/extra/interface'
import type { IProductServiceAdditionRepository } from '@/product/service/model/addition/interface'

import { Not } from 'typeorm'
import { YesOrNo } from '@xiaoshop/shared'
import { Inject, Injectable } from '@nestjs/common'

import { utcNow } from '~/utils/formatter'
import { ProductTagRepo } from '@/product/tag/model/provider'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { ProductGroupRepo } from '@/product/group/model/provider'
import { ProductSkuRepo } from '@/product/main/model/sku/provider'
import { ProductRepo } from '@/product/main/model/product/provider'
import { ProductCategoryRepo } from '@/product/category/model/provider'
import { ProductServiceExtraRepo } from '@/product/service/model/extra/provider'
import { ProductServiceAdditionRepo } from '@/product/service/model/addition/provider'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import {
  CreateProductPayload,
  ProductPropertyPayload,
  UpdateProductPayload,
} from '@/product/main/dto/payload'

import {
  ProductCopyEvent,
  ProductCreateEvent,
  ProductSoftDeleteEvent,
  ProductUpdateEvent,
} from './events'

@Injectable()
export class ProductService {
  constructor(
    @ProductRepo()
    private readonly repo: IProductRepository,

    @ProductSkuRepo()
    private readonly skuRepo: IProductSkuRepository,

    @ProductCategoryRepo()
    private readonly categoryRepo: IProductCategoryRepository,

    @ProductGroupRepo()
    private readonly groupRepo: IProductGroupRepository,

    @ProductTagRepo()
    private readonly tagRepo: IProductTagRepository,

    @ProductServiceAdditionRepo()
    private readonly additionRepo: IProductServiceAdditionRepository,

    @ProductServiceExtraRepo()
    private readonly extraRepo: IProductServiceExtraRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 创建商品
   *
   * @param data 创建数据
   * @param skipEvent 是否跳过事件
   * @throws {FailedException} 创建商品失败
   * @throws {ExistsException} 商品已存在
   */
  async create(data: CreateProductPayload, skipEvent = false) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('商品')

      const product = await this.repo.create({
        type: data.type,
        source: data.source,
        ...this.normalizeProduct(data),
      })

      if (data.skus && data.skus.length) {
        await this.skuRepo.create(data.skus.map(sku => ({
          ...sku,
          productId: product.id,
          productConnectId: product.connectId,
        })))
      }

      if (skipEvent)
        return product

      this.event.emit(
        new ProductCreateEvent(
          product.id,
          product.connectId,
          product.name,
          product.status,
          product.publishMode,
        ),
      )
    }
    catch (e) {
      throw new FailedException('创建商品', e.message, e.code)
    }
  }

  /**
   * 更新商品
   *
   * @param id 商品 ID
   * @param data 更新数据
   * @throws {NotFoundException} 商品不存在
   * @throws {ExistsException} 商品已存在
   * @throws {FailedException} 更新商品失败
   */
  async update(id: number, data: UpdateProductPayload) {
    try {
      const product = await this.repo.findById(id)

      if (!product)
        throw new NotFoundException('商品')

      if (await this.repo.exists({
        id: Not(id),
        name: data.name.trim(),
      })) {
        throw new ExistsException('商品')
      }

      const updated = await this.repo.update(
        product,
        this.normalizeProduct(data),
      )

      if (data.skus.length) {
        await this.skuRepo.update(
          product.skus,
          data.skus.map(sku => ({
            ...sku,
            productId: updated.id,
            productConnectId: updated.connectId,
          })),
        )
      }

      this.event.emit(
        new ProductUpdateEvent(
          updated.id,
          updated.connectId,
          updated.name,
          updated.status,
          updated.publishMode,
        ),
      )
    }
    catch (e) {
      throw new FailedException('更新商品', e.message, e.code)
    }
  }

  /**
   * 更新商品属性
   *
   * @param ids 商品 ID 列表
   * @param data 商品属性
   */
  async updateProperties(ids: number[], data: ProductPropertyPayload) {
    try {
      const updates = await this.repo.updateMany(ids.map((id) => {
        const entity = this.repo.newEntity({
          id,
        })

        if (data.brandId !== undefined)
          entity.brandId = data.brandId

        if (data.isEnableVipDiscount !== undefined)
          entity.isEnableVipDiscount = data.isEnableVipDiscount

        if (data.isEnableLimits !== undefined)
          entity.isEnableLimits = data.isEnableLimits

        if (data.limitsMaxQty !== undefined)
          entity.limitsMaxQty = data.limitsMaxQty

        if (data.limitsMinQty !== undefined)
          entity.limitsMinQty = data.limitsMinQty

        if (data.buyBtnNameType !== undefined)
          entity.buyBtnNameType = data.buyBtnNameType

        if (data.buyBtnName !== undefined)
          entity.buyBtnName = data.buyBtnName

        if (data.deliveryMethods)
          entity.deliveryMethods = data.deliveryMethods

        if (data.freightChargeMode !== undefined)
          entity.freightChargeMode = data.freightChargeMode

        if (data.freight !== undefined)
          entity.freight = data.freight

        if (data.freightTemplateId !== undefined)
          entity.freightTemplateId = data.freightTemplateId

        if (data.returnsFreightBy !== undefined)
          entity.returnsFreightBy = data.returnsFreightBy

        if (data.publishMode !== undefined)
          entity.publishMode = data.publishMode

        if (data.autoOnSaleAt !== undefined)
          entity.autoOnSaleAt = data.autoOnSaleAt

        if (data.categoryIds)
          entity.categories = data.categoryIds.map(id => this.categoryRepo.newEntity({ id }))

        if (data.tagIds)
          entity.tags = data.tagIds.map(id => this.tagRepo.newEntity({ id }))

        if (data.groupIds)
          entity.groups = data.groupIds.map(id => this.groupRepo.newEntity({ id }))

        if (data.additionIds)
          entity.additions = data.additionIds.map(id => this.additionRepo.newEntity({ id }))

        if (data.extraIds)
          entity.extras = data.extraIds.map(id => this.extraRepo.newEntity({ id }))

        return entity
      }))

      for (const update of updates) {
        this.event.emit(
          new ProductUpdateEvent(
            update.id,
            update.connectId,
            update.name,
            update.status,
            update.publishMode,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('更新商品属性', e.message, e.code)
    }
  }

  /**
   * 复制商品
   *
   * @param id 商品 ID
   * @throws {NotFoundException} 商品不存在
   * @throws {FailedException} 复制商品失败
   */
  async copy(id: number) {
    try {
      const product = await this.repo.findById(id)

      if (!product)
        throw new NotFoundException('商品')

      const copied = await this.create({
        type: product.type,
        source: product.source,
        name: `${product.name} (副本)`,
        desc: product.desc,
        slogan: product.slogan,
        content: product.content,
        attributes: product.attributes,
        brandId: product.brandId,
        images: product.images,
        video: product.video,
        isEnableLimits: product.isEnableLimits,
        isEnableVipDiscount: product.isEnableVipDiscount,
        limitsMaxQty: product.limitsMaxQty,
        limitsMinQty: product.limitsMinQty,
        buyBtnNameType: product.buyBtnNameType,
        buyBtnName: product.buyBtnName,
        sort: product.sort,
        skus: product.skus.map(sku => ({
          name: sku.name,
          image: sku.image,
          attributes: sku.attributes,
          price: sku.price,
          originalPrice: sku.originalPrice,
          costPrice: sku.costPrice,
          quantity: sku.quantity,
          threshold: sku.threshold,
          weight: sku.weight,
          volume: sku.volume,
          unit: sku.unit,
        })),
        groupIds: product.groups.map(group => group.id),
        categoryIds: product.categories.map(category => category.id),
        tagIds: product.tags.map(tag => tag.id),
        additionIds: product.additions.map(addition => addition.id),
        extraIds: product.extras.map(extra => extra.id),
        deliveryMethods: product.deliveryMethods,
        freightChargeMode: product.freightChargeMode,
        freight: product.freight,
        freightTemplateId: product.freightTemplateId,
        returnsFreightBy: product.returnsFreightBy,
        publishMode: product.publishMode,
        autoOnSaleAt: product.autoOnSaleAt,
      }, true)

      this.event.emit(
        new ProductCopyEvent(
          product.id,
          product.connectId,
          product.name,
          copied.id,
          copied.connectId,
          copied.name,
        ),
      )
    }
    catch (e) {
      throw new FailedException('复制商品', e.message, e.code)
    }
  }

  /**
   * 软删除商品
   *
   * @param id 商品 ID
   * @throws {FailedException} 软删除商品失败
   */
  async softDelete(id: number) {
    try {
      const product = await this.repo.findById(
        id,
        ['id', 'connectId', 'name', 'status', 'isDeleted', 'deletedTime'],
      )

      if (product && product.isDeleted === YesOrNo.NO) {
        await this.repo.update(product, {
          isDeleted: YesOrNo.YES,
          deletedTime: utcNow(),
        })

        this.event.emit(
          new ProductSoftDeleteEvent(
            product.id,
            product.connectId,
            product.name,
            product.status,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('软删除商品', e.message, e.code)
    }
  }

  /**
   * 标准化商品数据
   *
   * @param data 商品数据
   * @returns 标准化后的数据
   */
  private normalizeProduct(data: CreateProductPayload | UpdateProductPayload) {
    return {
      name: data.name,
      desc: data.desc,
      slogan: data.slogan,
      images: data.images,
      video: data.video,
      content: data.content,
      attributes: data.attributes,
      brandId: data.brandId,
      isEnableVipDiscount: data.isEnableVipDiscount,
      isEnableLimits: data.isEnableLimits,
      limitsMaxQty: data.limitsMaxQty,
      limitsMinQty: data.limitsMinQty,
      buyBtnNameType: data.buyBtnNameType,
      buyBtnName: data.buyBtnName,
      sort: data.sort,

      deliveryMethods: data.deliveryMethods,
      freightChargeMode: data.freightChargeMode,
      freight: data.freight,
      freightTemplateId: data.freightTemplateId,
      returnsFreightBy: data.returnsFreightBy,

      publishMode: data.publishMode,
      autoOnSaleAt: data.autoOnSaleAt,

      categories: data.categoryIds ? data.categoryIds.map(id => this.categoryRepo.newEntity({ id })) : [],
      groups: data.groupIds ? data.groupIds.map(id => this.groupRepo.newEntity({ id })) : [],
      tags: data.tagIds ? data.tagIds.map(id => this.tagRepo.newEntity({ id })) : [],
      additions: data.additionIds ? data.additionIds.map(id => this.additionRepo.newEntity({ id })) : [],
      extras: data.extraIds ? data.extraIds.map(id => this.extraRepo.newEntity({ id })) : [],

      // 是否多规格
      isMultiSkus: data.skus && data.skus.length > 1 ? YesOrNo.YES : YesOrNo.NO,
      // SKU 最低价
      price: data.skus ? Math.min(...data.skus.map(i => i.price || 0)) : 0,
      // 合计库存
      inventory: data.skus ? data.skus.reduce((t, i) => t + i.quantity, 0) : 0,
    }
  }
}
