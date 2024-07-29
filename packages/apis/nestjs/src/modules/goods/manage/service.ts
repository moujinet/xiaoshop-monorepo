import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Between, Brackets, FindOptionsWhere, In, LessThanOrEqual, Like, Not, Repository } from 'typeorm'
import {
  Enabled,
  GoodsBuyBtnType,
  GoodsFreightChargeMode,
  GoodsInventoryDeductMode,
  GoodsPublishMode,
  GoodsRatingGrade,
  GoodsReturnsFreightBy,
  GoodsSource,
  GoodsStatus,
  GoodsType,
  type IApiPaginationData,
  type IGoods,
  type IGoodsBasicInfo,
  type IGoodsDetailInfo,
  type IGoodsExportConditions,
  IGoodsExportListItem,
  type IGoodsInventoryInfo,
  type IGoodsListItem,
  type IGoodsStatus,
  LogisticsDeliveryMode,
} from '@xiaoshop/schema'
import {
  BatchUpdateGoodsData,
  CreateGoodsResponse,
  GetGoodsPagesRequest,
  GoodsBasicInfoPayload,
  GoodsDetailPayload,
  GoodsInventoryInfoPayload,
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
  GoodsInventoryEarlyWarningEvent,
  GoodsRestoreEvent,
  GoodsSoldOutEvent,
  GoodsStockedEvent,
  GoodsUpdateEvent,
} from '@/goods/goods.events'
import { Goods } from '@/goods/manage/entity'
import { GoodsTag } from '@/goods/tag/entity'
import { GoodsBrand } from '@/goods/brand/entity'
import { GoodsGroup } from '@/goods/group/entity'
import { GoodsCategory } from '@/goods/category/entity'
import { GoodsAddition } from '@/goods/addition/entity'
import { GoodsProtection } from '@/goods/protection/entity'
import { nanoNumber, nanoSkuCode, nanoid, unique } from '~/utils'

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private readonly repository: Repository<Goods>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 获取商品分页列表
   *
   * @param query GetGoodsPagesRequest
   * @throws FailedException
   * @returns Promise<IApiPaginationData<IGoodsListItem>>
   * @see {@link IGoodsListItem}
   */
  async findPages(query: GetGoodsPagesRequest): Promise<IApiPaginationData<IGoodsListItem>> {
    try {
      const where: FindOptionsWhere<Goods> = {
        isDeleted: query.isDeleted || Enabled.NO,
      }

      if (query.status !== 'warning')
        where.status = query.status as IGoodsStatus
      else
        where.isWarning = Enabled.YES

      if (query.source)
        where.source = query.source

      if (query.skuCode)
        where.skuCode = query.skuCode

      if (query.categoryId)
        where.categories = { id: query.categoryId }

      if (query.brandId)
        where.brand = { id: query.brandId }

      if (query.groupId)
        where.group = { id: query.groupId }

      if (query.tagId)
        where.tag = { id: query.tagId }

      if (query.name)
        where.name = Like(`%${query.name}%`)

      if (query.price) {
        const [min, max] = query.price.split(',')
        where.price = Between(Number(min), Number(max))
      }

      if (query.inventory) {
        const [min, max] = query.inventory.split(',')
        where.inventory = Between(Number(min), Number(max))
      }

      if (query.sales) {
        const [min, max] = query.sales.split(',')
        where.sales = Between(Number(min), Number(max))
      }

      if (query.inStockTime) {
        const [start, end] = query.inStockTime.split(',')
        where.inStockTime = Between(`${start} 00:00:00`, `${end} 23:59:59`)
      }

      if (query.stockedTime) {
        const [start, end] = query.stockedTime.split(',')
        where.stockedTime = Between(`${start} 00:00:00`, `${end} 23:59:59`)
      }

      if (query.createdTime) {
        const [start, end] = query.createdTime.split(',')
        where.createdTime = Between(`${start} 00:00:00`, `${end} 23:59:59`)
      }

      const pagesize = query.pagesize || 10
      const page = query.page || 1

      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          status: true,
          source: true,
          type: true,
          isMultiSkus: true,
          skuCode: true,
          name: true,
          images: true,
          tag: { id: true, name: true },
          group: { id: true, name: true },
          price: true,
          inventory: true,
          sales: true,
          sort: true,
          updatedTime: true,
          deletedTime: true,
        },
        relations: [
          'group',
          'tag',
        ],
        where,
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })

      return {
        result,
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取商品分页列表', e.message)
    }
  }

  /**
   * 获取商品导出列表
   *
   * @param query IGoodsExportConditions
   * @returns Promise<IGoodsExportListItem[]>
   * @throws FailedException
   */
  async findExportList(query: IGoodsExportConditions): Promise<IGoodsExportListItem[]> {
    try {
      const where: FindOptionsWhere<Goods> = {
        isDeleted: Enabled.NO,
      }

      if (query.status)
        where.status = query.status

      if (query.source)
        where.source = query.source

      if (query.categoryIds && query.categoryIds.length > 0)
        where.categories = { id: In(query.categoryIds) }

      if (query.brandId)
        where.brand = { id: query.brandId }

      if (query.groupId)
        where.group = { id: query.groupId }

      if (query.tagId)
        where.tag = { id: query.tagId }

      return await this.repository.find({
        select: {
          id: true,
          type: true,
          source: true,
          isMultiSkus: true,
          skuCode: true,
          name: true,
          price: true,
          originalPrice: true,
          costPrice: true,
          inventory: true,
          weight: true,
          volume: true,
          unit: true,
          sales: true,
          categories: { id: true, name: true },
          tag: { id: true, name: true },
          group: { id: true, name: true },
          brand: { id: true, name: true },
        },
        where,
        relations: ['group', 'tag', 'brand', 'categories'],
        order: {
          sort: 'ASC',
          createdTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品分页列表', e.message)
    }
  }

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
          additions: { id: true, name: true, price: true, icon: true },
          protections: { id: true, name: true, icon: true },
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
          id: 'ASC',
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
          type: true,
          video: true,
          images: true,
          name: true,
          shareDesc: true,
          slogan: true,
          attributes: true,
          deliveryModes: true,
          freight: true,
          freightTemplateId: true,
          freightChargeMode: true,
          returnsFreightBy: true,
          publishMode: true,
          autoInStockAt: true,
          buyBtnNameType: true,
          buyBtnName: true,
          categories: { id: true, name: true },
          brand: { id: true, name: true },
          group: { id: true, name: true },
          tag: { id: true, name: true },
          additions: { id: true, name: true, price: true, icon: true },
          protections: { id: true, name: true, icon: true },
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
   * @returns Promise<IGoodsInventoryInfo>
   * @throws NotFoundException
   * @throws FailedException
   */
  async findInventoryInfo(id: string): Promise<IGoodsInventoryInfo> {
    try {
      const goods = await this.repository.findOne({
        select: {
          id: true,
          type: true,
          isMultiSkus: true,
          skuCode: true,
          price: true,
          originalPrice: true,
          costPrice: true,
          inventory: true,
          inventoryEarlyWarning: true,
          weight: true,
          volume: true,
          unit: true,
          enablePurchaseLimits: true,
          purchaseMinQty: true,
          purchaseMaxQty: true,
          inventoryDeductMode: true,
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
      isDeleted: Enabled.NO,
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
        isDeleted: Enabled.NO,
        isWarning: Enabled.YES,
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
   * @emits GoodsCreatedEvent
   * @throws ExistsException
   * @throws FailedException
   */
  async createBasicInfo(data: GoodsBasicInfoPayload): Promise<CreateGoodsResponse> {
    try {
      const exists = await this.repository.existsBy({
        isDeleted: Enabled.NO,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品 [${data.name}] `)

      const goods = new Goods()

      goods.id = nanoid()
      goods.type = data.type || GoodsType.ENTITY
      goods.source = data.source || GoodsSource.MANUAL
      goods.video = data.video || ''
      goods.images = data.images || []
      goods.name = data.name
      goods.shareDesc = data.shareDesc || ''
      goods.slogan = data.slogan || ''
      goods.attributes = data.attributes || []
      goods.deliveryModes = data.deliveryModes || [LogisticsDeliveryMode.EXPRESS]
      goods.freight = data.freight || 0
      goods.freightTemplateId = data.freightTemplateId || 0
      goods.freightChargeMode = data.freightChargeMode || GoodsFreightChargeMode.TEMPLATE
      goods.returnsFreightBy = data.returnsFreightBy || GoodsReturnsFreightBy.BUYER
      goods.publishMode = data.publishMode || GoodsPublishMode.DIRECT
      goods.autoInStockAt = data.autoInStockAt || null
      goods.buyBtnNameType = data.buyBtnNameType || GoodsBuyBtnType.DEFAULT
      goods.buyBtnName = data.buyBtnName || ''
      goods.status = GoodsStatus.DRAFT
      goods.updatedTime = (new Date()).toISOString()

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
      const additions: GoodsAddition[] = []

      if (data.additionIds && data.additionIds.length > 0) {
        for (const additionId of data.additionIds) {
          const additional = new GoodsAddition()

          additional.id = additionId
          additions.push(additional)
        }
      }

      goods.additions = additions || []

      const res = await this.repository.save(goods)

      if (!res.id)
        throw new FailedException('创建商品基本信息')

      this.eventEmitter.emitAsync(
        GoodsCreateEvent.name,
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
        isDeleted: Enabled.NO,
        name: data.name,
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
          const additions: GoodsAddition[] = []

          for (const additionId of data.additionIds) {
            const additional = new GoodsAddition()

            additional.id = additionId
            additions.push(additional)
          }

          goods.additions = additions || []
        }
        else {
          goods[key] = data[key]
        }
      })

      goods.status = data.publishMode === GoodsPublishMode.DIRECT
        ? GoodsStatus.IN_STOCK
        : GoodsStatus.STOCKED

      const now = (new Date()).toISOString()

      goods.updatedTime = now

      if (goods.status === GoodsStatus.IN_STOCK) {
        goods.inStockTime = now
      }
      else if (goods.status === GoodsStatus.STOCKED) {
        goods.stockedTime = now
      }

      await this.repository.save(goods)
    }
    catch (e) {
      throw new FailedException('更新商品基本信息', e.message, e.status)
    }
  }

  /**
   * 更新商品价格库存信息
   *
   * @param id string
   * @param data GoodsInventoryInfoPayload
   * @emits GoodsUpdateEvent
   * @emits GoodsStockedEvent
   * @emits GoodsInStockEvent
   * @throws NotFoundException
   * @throws FailedException
   * @throws ExistsException
   * @returns Promise<IGoods['skuCode']>
   */
  async updateInventoryInfo(id: string, data: GoodsInventoryInfoPayload): Promise<IGoods['skuCode']> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品 [${id}] `)

      if (data.skuCode) {
        const exists = await this.repository.existsBy({
          id: Not(id),
          skuCode: data.skuCode,
          isDeleted: Enabled.NO,
        })

        if (exists)
          throw new ExistsException(`商品 [${data.skuCode}] `)
      }

      const goods = new Goods()

      goods.id = id
      goods.skuCode = data.skuCode || nanoSkuCode()
      goods.isMultiSkus = data.isMultiSkus || Enabled.NO
      goods.price = data.price || 0
      goods.originalPrice = data.originalPrice || 0
      goods.costPrice = data.costPrice || 0
      goods.inventory = data.inventory || 0
      goods.inventoryEarlyWarning = data.inventoryEarlyWarning || 0
      goods.weight = data.weight || 0
      goods.volume = data.volume || 0
      goods.unit = data.unit || ''
      goods.enablePurchaseLimits = data.enablePurchaseLimits || Enabled.NO
      goods.purchaseMinQty = data.purchaseMinQty || 1
      goods.purchaseMaxQty = data.purchaseMaxQty || 0
      goods.inventoryDeductMode = data.inventoryDeductMode || GoodsInventoryDeductMode.ORDER
      goods.enableVipDiscount = data.enableVipDiscount || Enabled.NO

      await this.repository.save(goods)

      this.eventEmitter.emitAsync(GoodsUpdateEvent.name, new GoodsUpdateEvent(id))

      if (goods.status === GoodsStatus.STOCKED) {
        this.eventEmitter.emitAsync(GoodsStockedEvent.name, new GoodsStockedEvent(id))
      }
      else if (goods.status === GoodsStatus.IN_STOCK) {
        this.eventEmitter.emitAsync(GoodsInStockEvent.name, new GoodsInStockEvent(id))
      }

      return goods.skuCode
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
   * @emits GoodsUpdateEvent
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
          const additions: GoodsAddition[] = []

          for (const additionId of data.additionIds) {
            const additional = new GoodsAddition()

            additional.id = additionId
            additions.push(additional)
          }

          goods.additions = additions || []
        }
        else {
          goods[key] = data[key]
        }
      }

      goods.updatedTime = (new Date()).toISOString()

      await this.repository.update({ id: In(ids) }, goods)

      for (const id of ids) {
        this.eventEmitter.emitAsync(GoodsUpdateEvent.name, new GoodsUpdateEvent(id))
      }
    }
    catch (e) {
      throw new FailedException('批量更新商品', e.message, e.status)
    }
  }

  /**
   * 复制商品至草稿
   *
   * @param id string
   * @throws NotFoundException
   * @throws FailedException
   * @emits GoodsCreateEvent
   * @returns Promise<string>
   */
  async copyToDraft(id: string): Promise<string> {
    try {
      const goods = await this.findDetail(id)

      if (!goods)
        throw new NotFoundException(`商品 [${id}] `)

      goods.id = nanoid()
      goods.name = `(复制) ${goods.name}`
      goods.skuCode = nanoNumber()
      goods.status = GoodsStatus.DRAFT
      goods.source = GoodsSource.MANUAL
      goods.overallGrade = GoodsRatingGrade.HIGH
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
      const additions: GoodsAddition[] = []

      if (goods.additions && goods.additions.length > 0) {
        for (const addition of goods.additions) {
          const additional = new GoodsAddition()

          additional.id = addition.id
          additions.push(additional)
        }
      }

      goods.additions = additions || []

      const res = await this.repository.save(goods)

      if (!res.id)
        throw new FailedException('复制商品至草稿')

      this.eventEmitter.emitAsync(GoodsCreateEvent.name, new GoodsCreateEvent(res.id))

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
   * @emits GoodsUpdateEvent
   * @emits GoodsSoldOutEvent
   */
  async updateSoldOutGoods(): Promise<string[]> {
    try {
      const goodsIds = await this.repository.find({
        select: ['id'],
        where: {
          isDeleted: Enabled.NO,
          status: GoodsStatus.IN_STOCK,
          inventory: LessThanOrEqual(0),
        },
      })

      if (goodsIds.length > 0) {
        await this.repository.update({
          id: In(goodsIds.map(item => item.id)),
        }, {
          soldOutTime: (new Date()).toISOString(),
          status: GoodsStatus.SOLD_OUT,
        })

        for (const id of goodsIds) {
          this.eventEmitter.emitAsync(GoodsUpdateEvent.name, new GoodsUpdateEvent(id.id))
          this.eventEmitter.emitAsync(GoodsSoldOutEvent.name, new GoodsSoldOutEvent(id.id))
        }

        return goodsIds.map(item => item.id)
      }

      return []
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
   * @emits GoodsInventoryEarlyWarningEvent
   */
  async updateInventoryEarlyWarning(): Promise<string[]> {
    try {
      const goodsIds = await this.repository.createQueryBuilder('goods')
        .innerJoinAndSelect('shop_goods_sku', 'sku', 'sku.goodsId = goods.id')
        .select(['goods.id'])
        .andWhere('goods.isDeleted = :isDelete', { isDelete: Enabled.NO })
        .andWhere('goods.status = :status', { status: GoodsStatus.IN_STOCK })
        .andWhere(
          new Brackets((qb) => {
            qb.where('sku.inventory <= sku.inventoryEarlyWarning')
              .orWhere('goods.inventory <= goods.inventoryEarlyWarning')
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
          isWarning: Enabled.YES,
        })

        for (const id of goodsIds) {
          this.eventEmitter.emitAsync(
            GoodsInventoryEarlyWarningEvent.name,
            new GoodsInventoryEarlyWarningEvent(id),
          )
        }
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
   * @emits GoodsInStockEvent
   */
  async updateAutoInStockGoods(): Promise<string[]> {
    try {
      const results = await this.repository.find({
        select: ['id', 'autoInStockAt'],
        where: {
          isDeleted: Enabled.NO,
          status: GoodsStatus.STOCKED,
          publishMode: GoodsPublishMode.AUTO,
        },
      })

      if (results.length > 0) {
        for (const goods of results) {
          const date = new Date(goods.autoInStockAt)
          const now = new Date(Date.now())

          if (date >= now) {
            await this.repository.update(goods.id, {
              stockedTime: now.toISOString(),
              status: GoodsStatus.IN_STOCK,
            })

            this.eventEmitter.emitAsync(
              GoodsInStockEvent.name,
              new GoodsInStockEvent(goods.id),
            )
          }
        }
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
   * @emits GoodsDeleteEvent
   */
  async softDelete(id: string): Promise<void> {
    try {
      await this.repository.update(
        { id },
        {
          isDeleted: Enabled.YES,
          deletedTime: (new Date()).toISOString(),
        },
      )

      this.eventEmitter.emitAsync(
        GoodsDeleteEvent.name,
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
   * @emits GoodsRestoreEvent
   */
  async restore(id: string): Promise<void> {
    try {
      await this.repository.update(
        { id },
        {
          isDeleted: Enabled.NO,
        },
      )

      this.eventEmitter.emitAsync(
        GoodsRestoreEvent.name,
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
   * @emits GoodsDeleteEvent
   */
  async batchDelete(ids: string[]): Promise<void> {
    try {
      await this.repository.update(
        {
          id: In(ids),
          isDeleted: Enabled.NO,
        },
        {
          isDeleted: Enabled.YES,
          deletedTime: (new Date()).toISOString(),
        },
      )

      for (const id of ids) {
        this.eventEmitter.emitAsync(
          GoodsDeleteEvent.name,
          new GoodsDeleteEvent(id),
        )
      }
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
   * @emits GoodsRestoreEvent
   */
  async batchRestore(ids: string[]): Promise<void> {
    try {
      await this.repository.update(
        {
          id: In(ids),
          isDeleted: Enabled.YES,
        },
        {
          isDeleted: Enabled.NO,
        },
      )

      for (const id of ids) {
        this.eventEmitter.emitAsync(
          GoodsRestoreEvent.name,
          new GoodsRestoreEvent(id),
        )
      }
    }
    catch (e) {
      throw new FailedException('批量恢复商品', e.message)
    }
  }
}
