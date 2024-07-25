import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Brackets, In, LessThanOrEqual, Not, Repository } from 'typeorm'
import {
  EnabledEnum,
  GoodsBuyBtnTypeEnum,
  GoodsLogisticsBackFreightByEnum,
  GoodsLogisticsFreightChargeModeEnum,
  GoodsPublishModeEnum,
  GoodsRatingGradeEnum,
  GoodsSourceEnum,
  GoodsStatusEnum,
  GoodsStockDeductModeEnum,
  GoodsTypeEnum,
  type IGoods,
  type IGoodsBasicInfo,
  type IGoodsDetailInfo,
  type IGoodsStockInfo,
  LogisticsDeliveryModeEnum,
} from '@xiaoshop/schema'
import {
  BatchUpdateGoodsData,
  CreateGoodsResponse,
  GoodsBasicInfoPayload,
  GoodsDetailPayload,
  GoodsStockInfoPayload,
} from '@/goods/manage/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exception'
import {
  GoodsCreateEvent,
  GoodsDeleteEvent,
  GoodsInStockEvent,
  GoodsRestoreEvent,
  GoodsSoldOutEvent,
  GoodsStockWarnEvent,
  GoodsStockedEvent,
  GoodsUpdateEvent,
} from '@/goods/goods.events'
import { Goods } from '@/goods/manage/entity'
import { GoodsTag } from '@/goods/tag/entity'
import { GoodsBrand } from '@/goods/brand/entity'
import { GoodsGroup } from '@/goods/group/entity'
import { GoodsCategory } from '@/goods/category/entity'
import { GoodsAdditional } from '@/goods/additional/entity'
import { GoodsProtection } from '@/goods/protection/entity'
import { nanoNumber, nanoid, unique } from '~/utils'

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private readonly repository: Repository<Goods>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 获取商品完整详情
   *
   * @param id string
   * @returns Promise<IGoods>
   * @throws NotFoundException
   * @throws FailedException
   */
  async findDetail(id: string): Promise<IGoods> {
    try {
      const goods = await this.repository.findOne({
        select: {
          categories: { id: true, name: true },
          brand: { id: true, name: true },
          group: { id: true, name: true },
          tag: { id: true, name: true },
          additions: {
            id: true,
            name: true,
            price: true,
            icon: true,
          },
          protections: {
            id: true,
            name: true,
            icon: true,
          },
        },
        where: {
          id,
        },
        relations: {
          categories: true,
          brand: true,
          group: true,
          tag: true,
          additions: true,
          protections: true,
        },
      })

      if (!goods)
        throw new NotFoundException('商品信息')

      return goods
    }
    catch (e) {
      throw new FailedException('获取商品完整详情', e.message, e.status)
    }
  }

  /**
   * 获取商品基本信息
   *
   * @param id string
   * @returns Promise<IGoodsBasicInfo>
   * @throws NotFoundException
   * @throws FailedException
   */
  async findBasicInfo(id: string): Promise<IGoodsBasicInfo> {
    try {
      const goods = await this.repository.findOne({
        select: {
          id: true,
          video: true,
          images: true,
          name: true,
          shareDesc: true,
          slogan: true,
          attributeTemplateId: true,
          attributes: true,
          logisticsDeliveryModes: true,
          logisticsFreight: true,
          logisticsFreightTemplateId: true,
          logisticsFreightChargeMode: true,
          logisticsBackFreightBy: true,
          publishMode: true,
          autoInStockAt: true,
          buyBtnNameType: true,
          buyBtnName: true,
          categories: { id: true, name: true },
          brand: { id: true, name: true },
          group: { id: true, name: true },
          tag: { id: true, name: true },
          additions: {
            id: true,
            name: true,
            price: true,
            icon: true,
          },
          protections: {
            id: true,
            name: true,
            icon: true,
          },
        },
        where: {
          id,
        },
        relations: {
          categories: true,
          brand: true,
          group: true,
          tag: true,
          additions: true,
          protections: true,
        },
        order: {
          id: 'DESC',
        },
      })

      if (!goods)
        throw new NotFoundException('商品基本信息')

      return goods
    }
    catch (e) {
      throw new FailedException('获取商品基本信息', e.message, e.status)
    }
  }

  /**
   * 获取商品库存信息
   *
   * @param id string
   * @returns Promise<IGoodsStockInfo>
   * @throws NotFoundException
   * @throws FailedException
   */
  async findStockInfo(id: string): Promise<IGoodsStockInfo> {
    try {
      const goods = await this.repository.findOne({
        select: {
          id: true,
          skuCode: true,
          price: true,
          originalPrice: true,
          costPrice: true,
          stock: true,
          alertStock: true,
          weight: true,
          volume: true,
          unit: true,
          enablePurchaseLimits: true,
          purchaseMinQty: true,
          purchaseMaxQty: true,
          stockDeductMode: true,
          enableVipDiscount: true,
        },
        where: {
          id,
        },
      })

      if (!goods)
        throw new NotFoundException('商品基本信息')

      return goods
    }
    catch (e) {
      throw new FailedException('获取商品库存信息', e.message, e.status)
    }
  }

  /**
   * 获取商品详情
   *
   * @param id string
   * @returns Promise<IGoodsDetailInfo>
   * @throws NotFoundException
   * @throws FailedException
   */
  async findDetailContent(id: string): Promise<IGoodsDetailInfo> {
    try {
      const goods = await this.repository.findOne({
        select: {
          id: true,
          detail: true,
        },
        where: {
          id,
        },
      })

      if (!goods)
        throw new NotFoundException('商品详情')

      return goods
    }
    catch (e) {
      throw new FailedException('获取商品详情', e.message, e.status)
    }
  }

  /**
   * 根据 ID 判断商品是否存在 (逻辑删除)
   *
   * @param id string
   * @returns Promise<boolean>
   */
  async isExists(id: string): Promise<boolean> {
    return this.repository.existsBy({
      id,
      isDeleted: EnabledEnum.NO,
    })
  }

  /**
   * 统计预警商品数量
   *
   * @returns Promise<number>
   * @throws FailedException
   */
  async countWarningGoods(): Promise<number> {
    try {
      return await this.repository.countBy({
        status: GoodsStatusEnum.WARNING,
        isDeleted: EnabledEnum.NO,
      })
    }
    catch (e) {
      throw new FailedException('获取预警商品数量', e.message)
    }
  }

  /**
   * 创建商品基本信息
   *
   * @param data GoodsBasicInfoPayload
   * @returns Promise<CreateGoodsResponse>
   * @throws ExistsException
   * @throws FailedException
   */
  async createBasicInfo(data: GoodsBasicInfoPayload): Promise<CreateGoodsResponse> {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
        isDeleted: EnabledEnum.NO,
      })

      if (exists)
        throw new ExistsException(`商品 [${data.name}] `)

      const goods = new Goods()

      goods.id = nanoid()
      goods.type = data.type || GoodsTypeEnum.ENTITY
      goods.status = data.status || GoodsStatusEnum.IN_STOCK
      goods.source = data.source || GoodsSourceEnum.MANUAL
      goods.video = data.video || ''
      goods.images = data.images || []
      goods.name = data.name
      goods.shareDesc = data.shareDesc || ''
      goods.slogan = data.slogan || ''
      goods.attributeTemplateId = data.attributeTemplateId || 0
      goods.attributes = data.attributes || []
      goods.logisticsDeliveryModes = data.logisticsDeliveryModes || [LogisticsDeliveryModeEnum.EXPRESS]
      goods.logisticsFreight = data.logisticsFreight || 0
      goods.logisticsFreightTemplateId = data.logisticsFreightTemplateId || 0
      goods.logisticsFreightChargeMode = data.logisticsFreightChargeMode || GoodsLogisticsFreightChargeModeEnum.TEMPLATE
      goods.logisticsBackFreightBy = data.logisticsBackFreightBy || GoodsLogisticsBackFreightByEnum.BUYER
      goods.publishMode = data.publishMode || GoodsPublishModeEnum.DIRECT
      goods.autoInStockAt = data.autoInStockAt || null
      goods.buyBtnNameType = data.buyBtnNameType || GoodsBuyBtnTypeEnum.DEFAULT
      goods.buyBtnName = data.buyBtnName || ''

      // Tag
      if (data.tagId) {
        const tag = new GoodsTag()

        tag.id = data.tagId
        goods.tag = tag
      }
      // Brand
      if (data.brandId) {
        const brand = new GoodsBrand()

        brand.id = data.brandId
        goods.brand = brand
      }
      // Group
      if (data.groupId) {
        const group = new GoodsGroup()

        group.id = data.groupId
        goods.group = group
      }

      // Category
      const categories: GoodsCategory[] = []

      if (data.categoryIds && data.categoryIds.length > 0) {
        for (const cateId of data.categoryIds) {
          const category = new GoodsCategory()

          category.id = cateId
          categories.push(category)
        }
      }

      goods.categories = categories

      // Protections
      const protections: GoodsProtection[] = []

      if (data.protectionIds && data.protectionIds.length > 0) {
        for (const protectId of data.protectionIds) {
          const protection = new GoodsProtection()

          protection.id = protectId
          protections.push(protection)
        }
      }

      goods.protections = protections || []

      // Additions
      const additions: GoodsAdditional[] = []

      if (data.additionIds && data.additionIds.length > 0) {
        for (const additionId of data.additionIds) {
          const additional = new GoodsAdditional()

          additional.id = additionId
          additions.push(additional)
        }
      }

      goods.additions = additions || []

      const res = await this.repository.save(goods)

      this.eventEmitter.emit(
        GoodsCreateEvent.eventName,
        new GoodsCreateEvent(res.id),
      )

      return {
        id: res.id,
      }
    }
    catch (e) {
      throw new FailedException('创建商品基本信息', e.message, e.status)
    }
  }

  /**
   * 更新商品基本信息
   *
   * @param id string
   * @param data GoodsBasicInfoPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   */
  async updateBasicInfo(id: string, data: GoodsBasicInfoPayload): Promise<void> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
        isDeleted: EnabledEnum.NO,
      })

      if (exists)
        throw new ExistsException(`商品 [${data.name}] `)

      const goods = new Goods()

      goods.id = id

      Object.keys(data).forEach((key) => {
        if (key === 'tagId' && data.tagId) {
          const tag = new GoodsTag()

          tag.id = data.tagId
          goods.tag = tag
        }
        else if (key === 'brandId' && data.brandId) {
          const brand = new GoodsBrand()

          brand.id = data.brandId
          goods.brand = brand
        }
        else if (key === 'groupId' && data.groupId) {
          const group = new GoodsGroup()

          group.id = data.groupId
          goods.group = group
        }
        else if (key === 'categoryIds' && data.categoryIds && data.categoryIds.length) {
          const categories: GoodsCategory[] = []

          for (const cateId of data.categoryIds) {
            const category = new GoodsCategory()

            category.id = cateId
            categories.push(category)
          }

          goods.categories = categories
        }
        else if (key === 'protectionIds' && data.protectionIds && data.protectionIds.length) {
          const protections: GoodsProtection[] = []

          for (const protectId of data.protectionIds) {
            const protection = new GoodsProtection()

            protection.id = protectId
            protections.push(protection)
          }

          goods.protections = protections || []
        }
        else if (key === 'additionIds' && data.additionIds && data.additionIds.length) {
          const additions: GoodsAdditional[] = []

          for (const additionId of data.additionIds) {
            const additional = new GoodsAdditional()

            additional.id = additionId
            additions.push(additional)
          }

          goods.additions = additions || []
        }
        else {
          goods[key] = data[key]
        }
      })

      await this.repository.save(goods)

      this.eventEmitter.emit(
        GoodsUpdateEvent.eventName,
        new GoodsUpdateEvent(id),
      )
    }
    catch (e) {
      throw new FailedException('更新商品基本信息', e.message, e.status)
    }
  }

  /**
   * 更新商品价格库存信息
   *
   * @param id string
   * @param data GoodsStockInfoPayload
   * @throws NotFoundException
   * @throws FailedException
   * @throws ExistsException
   */
  async updateStockInfo(id: string, data: GoodsStockInfoPayload): Promise<void> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品 [${id}] `)

      if (data.skuCode) {
        const exists = await this.repository.existsBy({
          id: Not(id),
          skuCode: data.skuCode,
          isDeleted: EnabledEnum.NO,
        })

        if (exists)
          throw new ExistsException(`商品 [${data.skuCode}] `)
      }

      const goods = new Goods()

      goods.id = id
      goods.skuCode = data.skuCode || nanoNumber()
      goods.price = data.price || 0
      goods.originalPrice = data.originalPrice || 0
      goods.costPrice = data.costPrice || 0
      goods.stock = data.stock || 0
      goods.alertStock = data.alertStock || 0
      goods.weight = data.weight || 0
      goods.volume = data.volume || 0
      goods.unit = data.unit || ''
      goods.enablePurchaseLimits = data.enablePurchaseLimits || EnabledEnum.NO
      goods.purchaseMinQty = data.purchaseMinQty || 1
      goods.purchaseMaxQty = data.purchaseMaxQty || 0
      goods.stockDeductMode = data.stockDeductMode || GoodsStockDeductModeEnum.PAID
      goods.enableVipDiscount = data.enableVipDiscount || EnabledEnum.NO

      await this.repository.save(goods)
    }
    catch (e) {
      throw new FailedException('更新商品价格库存信息', e.message, e.status)
    }
  }

  /**
   * 更新商品详情
   *
   * @param id string
   * @param data GoodsDetailPayload
   * @throws NotFoundException
   * @throws FailedException
   */
  async updateDetail(id: string, data: GoodsDetailPayload): Promise<void> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品 [${id}] `)

      const goods = new Goods()

      goods.id = id
      goods.detail = data.detail || ''

      await this.repository.save(goods)
    }
    catch (e) {
      throw new FailedException('更新商品详情', e.message, e.status)
    }
  }

  /**
   * 增加浏览量
   *
   * @param id string
   * @throws FailedException
   */
  async updateVisit(id: string): Promise<void> {
    try {
      await this.repository.increment({ id }, 'visit', 1)
    }
    catch (e) {
      throw new FailedException('增加浏览量', e.message, e.status)
    }
  }

  /**
   * 批量更新商品
   *
   * @param ids string[]
   * @param data BatchUpdateGoodsData
   * @throws NotFoundException
   * @throws FailedException
   */
  async batchUpdate(ids: string[], data: BatchUpdateGoodsData): Promise<void> {
    try {
      const founded = await this.repository.existsBy({ id: In(ids) })

      if (!founded)
        throw new NotFoundException(`批量更新商品 [${ids.join(',')}]`)

      const goods: Partial<IGoods> = {}

      for (const key of Object.keys(data)) {
        if (key === 'tagId' && data.tagId) {
          const tag = new GoodsTag()

          tag.id = data.tagId
          goods.tag = tag
        }
        else if (key === 'brandId' && data.brandId) {
          const brand = new GoodsBrand()

          brand.id = data.brandId
          goods.brand = brand
        }
        else if (key === 'groupId' && data.groupId) {
          const group = new GoodsGroup()

          group.id = data.groupId
          goods.group = group
        }
        else if (key === 'categoryIds' && data.categoryIds && data.categoryIds.length) {
          const categories: GoodsCategory[] = []

          for (const cateId of data.categoryIds) {
            const category = new GoodsCategory()

            category.id = cateId
            categories.push(category)
          }

          goods.categories = categories
        }
        else if (key === 'protectionIds' && data.protectionIds && data.protectionIds.length) {
          const protections: GoodsProtection[] = []

          for (const protectId of data.protectionIds) {
            const protection = new GoodsProtection()

            protection.id = protectId
            protections.push(protection)
          }

          goods.protections = protections || []
        }
        else if (key === 'additionIds' && data.additionIds && data.additionIds.length) {
          const additions: GoodsAdditional[] = []

          for (const additionId of data.additionIds) {
            const additional = new GoodsAdditional()

            additional.id = additionId
            additions.push(additional)
          }

          goods.additions = additions || []
        }
        else {
          goods[key] = data[key]
        }
      }

      await this.repository.update({ id: In(ids) }, goods)

      if (goods.status) {
        if (goods.status === GoodsStatusEnum.IN_STOCK) {
          this.eventEmitter.emit(
            GoodsInStockEvent.eventName,
            new GoodsInStockEvent(ids.join(',')),
          )
        }
        else if (goods.status === GoodsStatusEnum.STOCKED) {
          this.eventEmitter.emit(
            GoodsStockedEvent.eventName,
            new GoodsStockedEvent(ids.join(',')),
          )
        }
        else if (goods.status === GoodsStatusEnum.SOLD_OUT) {
          this.eventEmitter.emit(
            GoodsSoldOutEvent.eventName,
            new GoodsSoldOutEvent(ids.join(',')),
          )
        }
        else if (goods.status === GoodsStatusEnum.WARNING) {
          this.eventEmitter.emit(
            GoodsStockWarnEvent.eventName,
            new GoodsStockWarnEvent(ids.join(',')),
          )
        }
      }

      this.eventEmitter.emit(
        GoodsUpdateEvent.eventName,
        new GoodsUpdateEvent(ids.join(',')),
      )
    }
    catch (e) {
      throw new FailedException('批量更新商品', e.message, e.status)
    }
  }

  /**
   * 复制商品至草稿
   *
   * @param id string
   * @returns Promise<string>
   */
  async cloneToDraft(id: string): Promise<string> {
    try {
      const goods = await this.findDetail(id)

      if (!goods)
        throw new NotFoundException(`商品 [${id}] `)

      goods.id = nanoid()
      goods.name = `(复制) ${goods.name}`
      goods.skuCode = nanoNumber()
      goods.status = GoodsStatusEnum.DRAFT
      goods.source = GoodsSourceEnum.MANUAL
      goods.overallGrade = GoodsRatingGradeEnum.HIGH
      goods.overallGoodsScore = 5
      goods.overallServiceScore = 5
      goods.overallLogisticsScore = 5
      goods.sales = 0
      goods.views = 0
      goods.favorites = 0
      goods.sort = 1

      delete goods.createdTime
      delete goods.updatedTime
      delete goods.deletedTime
      delete goods.inStockTime
      delete goods.stockedTime
      delete goods.soldOutTime

      // Tag
      if (goods.tag) {
        const tag = new GoodsTag()

        tag.id = goods.tag.id
        goods.tag = tag
      }
      // Brand
      if (goods.brand) {
        const brand = new GoodsBrand()

        brand.id = goods.brand.id
        goods.brand = brand
      }
      // Group
      if (goods.group) {
        const group = new GoodsGroup()

        group.id = goods.group.id
        goods.group = group
      }

      // Category
      const categories: GoodsCategory[] = []

      if (goods.categories && goods.categories.length > 0) {
        for (const cate of goods.categories) {
          const category = new GoodsCategory()

          category.id = cate.id
          categories.push(category)
        }
      }

      goods.categories = categories

      // Protections
      const protections: GoodsProtection[] = []

      if (goods.protections && goods.protections.length > 0) {
        for (const protect of goods.protections) {
          const protection = new GoodsProtection()

          protection.id = protect.id
          protections.push(protection)
        }
      }

      goods.protections = protections || []

      // Additions
      const additions: GoodsAdditional[] = []

      if (goods.additions && goods.additions.length > 0) {
        for (const addition of goods.additions) {
          const additional = new GoodsAdditional()

          additional.id = addition.id
          additions.push(additional)
        }
      }

      goods.additions = additions || []

      const res = await this.repository.save(goods)

      return res.id
    }
    catch (e) {
      throw new FailedException('复制商品至草稿', e.message, e.status)
    }
  }

  /**
   * 下架售罄商品
   *
   * @returns Promise<string[]>
   * @throws FailedException
   */
  async updateSoldOutGoods(): Promise<string[]> {
    try {
      const goodsIds = await this.repository.find({
        select: ['id'],
        where: {
          status: GoodsStatusEnum.IN_STOCK,
          stock: LessThanOrEqual(0),
        },
      })

      if (goodsIds.length > 0) {
        await this.repository.update({
          id: In(goodsIds.map(item => item.id)),
        }, {
          status: GoodsStatusEnum.SOLD_OUT,
        })

        this.eventEmitter.emit(
          GoodsSoldOutEvent.eventName,
          new GoodsSoldOutEvent(goodsIds.map(item => item.id).join(',')),
        )
      }

      return goodsIds.map(item => item.id)
    }
    catch (e) {
      throw new FailedException('下架售罄商品', e.message)
    }
  }

  /**
   * 库存预警商品
   *
   * @returns Promise<string[]>
   * @throws FailedException
   */
  async updateStockWarnGoods(): Promise<string[]> {
    try {
      const goodsIds = await this.repository.createQueryBuilder('goods')
        .innerJoinAndSelect('shop_goods_sku', 'sku', 'sku.goodsId = goods.id')
        .select(['goods.id'])
        .where('goods.status = :status', { status: GoodsStatusEnum.IN_STOCK })
        .andWhere('goods.isDeleted = :isDelete', { isDelete: EnabledEnum.NO })
        .andWhere(
          new Brackets((qb) => {
            qb.where('sku.stock <= sku.alertStock')
              .orWhere('goods.stock <= goods.alertStock')
          }),
        )
        .getRawMany()
        .then(
          list => unique<string>(list.map(item => item.goods_id)),
        )

      if (goodsIds.length > 0) {
        await this.repository.update({
          id: In(goodsIds),
        }, {
          status: GoodsStatusEnum.WARNING,
        })

        this.eventEmitter.emit(
          GoodsStockWarnEvent.eventName,
          new GoodsStockWarnEvent(goodsIds.join(',')),
        )
      }

      return goodsIds
    }
    catch (e) {
      throw new FailedException('库存预警', e.message)
    }
  }

  /**
   * 自动上架商品
   *
   * @returns Promise<string[]>
   * @throws FailedException
   */
  async updateAutoInStockGoods(): Promise<string[]> {
    try {
      const results = await this.repository.find({
        select: ['id', 'autoInStockAt'],
        where: {
          status: In([GoodsStatusEnum.IN_STOCK, GoodsStatusEnum.DRAFT]),
          publishMode: GoodsPublishModeEnum.AUTO,
          isDeleted: EnabledEnum.NO,
        },
      })

      if (results.length > 0) {
        for (const goods of results) {
          const date = new Date(goods.autoInStockAt)
          const now = new Date(Date.now())

          if (date >= now) {
            await this.repository.update(goods.id, {
              status: GoodsStatusEnum.IN_STOCK,
            })
          }
        }

        this.eventEmitter.emit(
          GoodsInStockEvent.eventName,
          new GoodsInStockEvent(results.map(goods => goods.id).join(',')),
        )
      }

      return results.map(goods => goods.id)
    }
    catch (e) {
      throw new FailedException('自动上架商品', e.message)
    }
  }

  /**
   * 软删除商品
   *
   * @param id string
   * @throws FailedException
   */
  async softDelete(id: string): Promise<void> {
    try {
      await this.repository.update(
        { id },
        {
          isDeleted: EnabledEnum.YES,
          deletedTime: (new Date()).toString(),
        },
      )

      this.eventEmitter.emit(
        GoodsDeleteEvent.eventName,
        new GoodsDeleteEvent(id),
      )
    }
    catch (e) {
      throw new FailedException('删除商品', e.message)
    }
  }

  /**
   * 恢复商品
   *
   * @param id string
   * @throws FailedException
   */
  async restore(id: string): Promise<void> {
    try {
      await this.repository.update(
        { id },
        {
          isDeleted: EnabledEnum.NO,
          deletedTime: null,
        },
      )

      this.eventEmitter.emit(
        GoodsRestoreEvent.eventName,
        new GoodsRestoreEvent(id),
      )
    }
    catch (e) {
      throw new FailedException('恢复商品', e.message)
    }
  }

  /**
   * 批量删除商品
   *
   * @param ids string[]
   * @returns Promise<void>
   * @throws FailedException
   */
  async batchDelete(ids: string[]): Promise<void> {
    try {
      await this.repository.update(
        {
          id: In(ids),
          isDeleted: EnabledEnum.NO,
        },
        {
          isDeleted: EnabledEnum.YES,
          deletedTime: (new Date()).toString(),
        },
      )

      this.eventEmitter.emit(
        GoodsDeleteEvent.eventName,
        new GoodsDeleteEvent(ids.join(',')),
      )
    }
    catch (e) {
      throw new FailedException('批量删除商品', e.message)
    }
  }

  /**
   * 批量恢复商品
   *
   * @param ids string[]
   * @returns Promise<void>
   * @throws FailedException
   */
  async batchRestore(ids: string[]): Promise<void> {
    try {
      await this.repository.update(
        {
          id: In(ids),
          isDeleted: EnabledEnum.YES,
        },
        {
          isDeleted: EnabledEnum.NO,
          deletedTime: null,
        },
      )

      this.eventEmitter.emit(
        GoodsRestoreEvent.eventName,
        new GoodsRestoreEvent(ids.join(',')),
      )
    }
    catch (e) {
      throw new FailedException('批量恢复商品', e.message)
    }
  }
}
