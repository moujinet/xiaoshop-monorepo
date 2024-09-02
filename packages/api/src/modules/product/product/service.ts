import {
  BUY_BUTTON_DEFAULT_NAME,
  type IApiPaginationData,
  type IProduct,
  type IProductExportConditions,
  type IProductExportListItem,
  type IProductListItem,
  IProductSku,
  type IProductStatus,
  type IYesOrNo,
  ProductBuyBtnType,
  ProductFreightChargeMode,
  ProductInventoryDeductMode,
  ProductPublishMode,
  ProductReturnsFreightBy,
  ProductSource,
  ProductStatus,
  ProductType,
  YesOrNo,
} from '@xiaoshop/shared'
import {
  Between,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  Not,
  Repository,
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '@/product/product/entity'
import { ProductSku } from '@/product/sku/entity'
import { ProductAddition } from '@/product/addition/entity'
import { ProductCategory } from '@/product/category/entity'
import { ProductCommitment } from '@/product/commitment/entity'
import {
  GetProductPagesRequest,
  ProductPayload,
  ProductSkuPayload,
  UpdateProductPropertiesPayload,
} from '@/product/product/dto'
import {
  ProductCopiedEvent,
  ProductCreatedEvent,
  ProductDeletedEvent,
  ProductPropertiesUpdatedEvent,
  ProductRestoredEvent,
  ProductSoldOutEvent,
  ProductStatusUpdatedEvent,
  ProductTrashClearedEvent,
  ProductUpdatedEvent,
} from '@/product/product/events'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { nanoSkuCode } from '~/utils/nanoid'
import { toEventName } from '~/utils/transformers'
import { nowStr } from '~/utils/datetime'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IProductListItem>>
   * @throws {FailedException} 获取商品列表失败
   */
  async findPages(
    query: GetProductPagesRequest,
  ): Promise<IApiPaginationData<IProductListItem>> {
    try {
      const where: FindOptionsWhere<Product> = {
        isDeleted: query.isDeleted || YesOrNo.NO,
      }

      if (query.status === 'warning') {
        where.isWarning = YesOrNo.YES
      }
      else if (query.status) {
        where.status = query.status
      }

      if (query.name) {
        where.name = Like(`%${query.name}%`)
      }
      else if (query.skuCode) {
        where.skus = { skuCode: Like(`%${query.skuCode}%`) }
      }

      if (query.source)
        where.source = query.source

      if (query.categoryId)
        where.categories = { id: query.categoryId }

      if (query.groupId)
        where.group = { id: query.groupId }

      if (query.brandId)
        where.brand = { id: query.brandId }

      if (query.tagId)
        where.tag = { id: query.tagId }

      if (query.price) {
        const [min, max] = query.price.split(',')
        where.price = Between(Number(min.trim()), Number(max.trim()))
      }

      if (query.inventory) {
        const [min, max] = query.inventory.split(',')
        where.inventory = Between(Number(min.trim()), Number(max.trim()))
      }

      if (query.sales) {
        const [min, max] = query.sales.split(',')
        where.sales = Between(Number(min.trim()), Number(max.trim()))
      }

      if (query.onSaleTime) {
        const [from, to] = query.onSaleTime.split(',')
        where.onSaleTime = Between(`${from.trim()} 00:00:00`, `${to.trim()} 23:59:59`)
      }

      if (query.stockedTime) {
        const [from, to] = query.stockedTime.split(',')
        where.stockedTime = Between(`${from.trim()} 00:00:00`, `${to.trim()} 23:59:59`)
      }

      if (query.createdTime) {
        const [from, to] = query.createdTime.split(',')
        where.createdTime = Between(`${from.trim()} 00:00:00`, `${to.trim()} 23:59:59`)
      }

      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          uuid: true,
          type: true,
          status: true,
          source: true,
          name: true,
          slogan: true,
          images: true,
          video: true,
          categories: { id: true, parentId: true, name: true },
          group: { id: true, name: true },
          tag: { id: true, name: true, color: true },
          brand: { id: true, name: true },
          commitments: { id: true, name: true, icon: true },
          additions: { id: true, name: true, icon: true, price: true },
          price: true,
          inventory: true,
          isMultiSkus: true,
          sales: true,
          favorites: true,
          views: true,
          sort: true,
          createdTime: true,
          updatedTime: true,
        },
        where,
        relations: ['categories', 'group', 'tag', 'brand', 'commitments', 'additions'],
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          sort: 'ASC',
          createdTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取商品列表失败', e.message)
    }
  }

  /**
   * 获取商品导出列表
   *
   * @param query 导出条件
   * @returns Promise<IProductExportListItem[]>
   * @throws {FailedException} 获取商品导出列表失败
   */
  async findExportList(
    query: IProductExportConditions,
  ): Promise<IProductExportListItem[]> {
    try {
      const where: FindOptionsWhere<Product> = {
        isDeleted: YesOrNo.NO,
      }

      if (query.type)
        where.type = query.type

      if (query.status)
        where.status = query.status

      if (query.source)
        where.source = query.source

      if (query.categoryIds && query.categoryIds.length > 0)
        where.categories = { id: In(query.categoryIds) }

      if (query.brandIds && query.brandIds.length > 0)
        where.brand = { id: In(query.brandIds) }

      if (query.groupIds && query.groupIds.length > 0)
        where.group = { id: In(query.groupIds) }

      if (query.tagIds && query.tagIds.length > 0)
        where.tag = { id: In(query.tagIds) }

      return await this.repository.find({
        select: {
          id: true,
          type: true,
          source: true,
          status: true,
          isMultiSkus: true,
          name: true,
          price: true,
          inventory: true,
          sales: true,
          skus: {
            id: true,
            uuid: true,
            productId: true,
            productUuid: true,
            skuCode: true,
            name: true,
            attributes: true,
            image: true,
            price: true,
            originalPrice: true,
            costPrice: true,
            inventory: true,
            inventoryEarlyWarning: true,
            weight: true,
            volume: true,
            sales: true,
            unit: true,
          },
          categories: { id: true, parentId: true, name: true },
          group: { id: true, name: true },
          tag: { id: true, name: true, color: true },
          brand: { id: true, name: true },
        },
        where,
        relations: ['skus', 'categories', 'group', 'tag', 'brand'],
        order: {
          createdTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品导出列表', e.message)
    }
  }

  /**
   * 根据 ID 获取商品详情
   *
   * @param id 商品 ID
   * @returns Promise<IProduct>
   * @throws {NotFoundException} 商品不存在
   * @throws {FailedException} 获取商品详情失败
   */
  async findById(id: number): Promise<IProduct> {
    try {
      const founded = await this.repository.findOne({
        select: {
          categories: { id: true, parentId: true, name: true },
          group: { id: true, name: true },
          tag: { id: true, name: true, color: true },
          brand: { id: true, name: true },
          commitments: { id: true, name: true, icon: true },
          additions: { id: true, name: true, icon: true, price: true },
          skus: {
            id: true,
            uuid: true,
            productId: true,
            productUuid: true,
            skuCode: true,
            name: true,
            attributes: true,
            image: true,
            price: true,
            originalPrice: true,
            costPrice: true,
            inventory: true,
            inventoryEarlyWarning: true,
            weight: true,
            volume: true,
            sales: true,
            unit: true,
          },
        },
        where: { id },
        relations: ['skus', 'categories', 'group', 'tag', 'brand', 'commitments', 'additions'],
      })

      if (!founded)
        throw new NotFoundException('商品信息')

      return founded
    }
    catch (e) {
      throw new FailedException('获取商品详情', e.message, e.status)
    }
  }

  /**
   * 创建商品
   *
   * @param data 商品信息
   * @throws {ExistsException} 商品已存在
   * @throws {FailedException} 创建商品失败
   * @event ProductCreatedEvent
   */
  async create(data: ProductPayload) {
    try {
      const exists = await this.repository.existsBy({
        isDeleted: YesOrNo.NO,
        name: data.name,
      })

      if (exists)
        throw new ExistsException('商品信息')

      const product = new Product()

      product.uuid = uuid()
      product.type = data.type || ProductType.ENTITY
      product.source = data.source || ProductSource.MANUAL
      product.name = data.name
      product.desc = data.desc || ''
      product.slogan = data.slogan || ''
      product.images = data.images
      product.video = data.video || ''
      product.attributes = data.attributes || []
      product.enableVipDiscount = data.enableVipDiscount || YesOrNo.NO
      product.enablePurchaseLimits = data.enablePurchaseLimits || YesOrNo.NO
      product.purchaseMaxQty = data.purchaseMaxQty || 0
      product.purchaseMinQty = data.purchaseMinQty || 1
      product.inventoryDeductMode = data.inventoryDeductMode || ProductInventoryDeductMode.ORDER
      product.deliveryMethods = data.deliveryMethods || []
      product.freightChargeMode = data.freightChargeMode || ProductFreightChargeMode.TEMPLATE
      product.freight = data.freight || 0
      product.freightTemplateId = data.freightTemplateId || 0
      product.returnsFreightBy = data.returnsFreightBy || ProductReturnsFreightBy.BUYER
      product.publishMode = data.publishMode || ProductPublishMode.STOCKED
      product.autoInStockAt = data.autoInStockAt || ''
      product.buyBtnNameType = data.buyBtnNameType || ProductBuyBtnType.DEFAULT
      product.buyBtnName = data.buyBtnName || BUY_BUTTON_DEFAULT_NAME
      product.detail = data.detail || ''
      product.sort = data.sort || 1

      product.status = product.publishMode === ProductPublishMode.DIRECT
        ? ProductStatus.ON_SALE
        : ProductStatus.STOCKED

      if (data.tagId)
        product.tagId = data.tagId

      if (data.groupId)
        product.groupId = data.groupId

      if (data.brandId)
        product.brandId = data.brandId

      // Category
      if (data.categoryIds && data.categoryIds.length > 0) {
        product.categories = []

        data.categoryIds.forEach((cateId) => {
          const cate = new ProductCategory()
          cate.id = cateId

          product.categories.push(cate)
        })
      }

      // Commitment
      if (data.commitmentIds && data.commitmentIds.length > 0) {
        product.commitments = []

        data.commitmentIds.forEach((commitmentId) => {
          const commitment = new ProductCommitment()
          commitment.id = commitmentId

          product.commitments.push(commitment)
        })
      }

      // Addition
      if (data.additionIds && data.additionIds.length > 0) {
        product.additions = []

        data.additionIds.forEach((additionId) => {
          const addition = new ProductAddition()
          addition.id = additionId

          product.additions.push(addition)
        })
      }

      // Skus
      if (data.skus && data.skus.length > 0) {
        product.skus = []

        data.skus.forEach((item, index) => {
          const sku = new ProductSku()

          sku.uuid = uuid()
          sku.productUuid = product.uuid
          sku.skuCode = item.skuCode || nanoSkuCode(index)
          sku.name = item.name || ''
          sku.attributes = item.attributes || []
          sku.image = item.image || ''
          sku.price = item.price || 0
          sku.originalPrice = item.originalPrice || 0
          sku.costPrice = item.costPrice || 0
          sku.inventory = item.inventory || 0
          sku.inventoryEarlyWarning = item.inventoryEarlyWarning || 0
          sku.weight = item.weight || 0
          sku.volume = item.volume || 0
          sku.unit = item.unit || ''

          product.skus.push(sku)
        })

        // 超过 1 个 SKU，则为多规格
        product.isMultiSkus = product.skus.length > 1 ? YesOrNo.YES : YesOrNo.NO
        // 取最低价
        product.price = product.skus.reduce((a, b) => a.price < b.price ? a : b).price
        // 合计库存
        product.inventory = product.skus.reduce((a, b) => a + b.inventory, 0)
      }

      const created = await this.repository.save(product, { transaction: true })

      this.event.emit(
        toEventName(ProductCreatedEvent.name),
        new ProductCreatedEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品', e.message, e.status)
    }
  }

  /**
   * 更新商品
   *
   * @param id 商品 ID
   * @param data 商品信息
   * @throws {NotFoundException} 商品不存在
   * @throws {ExistsException} 商品已存在
   * @throws {FailedException} 更新商品失败
   * @event ProductUpdatedEvent
   */
  async update(id: number, data: ProductPayload) {
    try {
      const product = await this.repository.findOne({
        where: {
          id,
          isDeleted: YesOrNo.NO,
          status: Not(ProductStatus.ON_SALE), // 不允许更新已上架的商品
        },
        relations: ['skus', 'categories', 'group', 'tag', 'brand', 'commitments', 'additions'],
      })

      if (!product)
        throw new NotFoundException('商品信息')

      const exists = await this.repository.existsBy({
        id: Not(id),
        isDeleted: YesOrNo.NO,
        name: data.name,
      })

      if (exists)
        throw new ExistsException('商品信息')

      const keys = [
        'name',
        'desc',
        'slogan',
        'images',
        'video',
        'attributes',
        'enableVipDiscount',
        'enablePurchaseLimits',
        'purchaseMaxQty',
        'purchaseMinQty',
        'inventoryDeductMode',
        'deliveryMethods',
        'freightChargeMode',
        'freight',
        'freightTemplateId',
        'returnsFreightBy',
        'publishMode',
        'autoInStockAt',
        'buyBtnNameType',
        'buyBtnName',
        'detail',
        'sort',
      ]

      for (const key in data) {
        if (keys.includes(key))
          product[key] = data[key]
      }

      product.status = product.publishMode === ProductPublishMode.DIRECT
        ? ProductStatus.ON_SALE
        : ProductStatus.STOCKED

      if (data.tagId) {
        product.tagId = data.tagId
        delete product.tag
      }

      if (data.groupId) {
        product.groupId = data.groupId
        delete product.group
      }

      if (data.brandId) {
        product.brandId = data.brandId
        delete product.brand
      }

      // Category
      if (data.categoryIds && data.categoryIds.length > 0) {
        product.categories = []

        data.categoryIds.forEach((cateId) => {
          const cate = new ProductCategory()
          cate.id = cateId

          product.categories.push(cate)
        })
      }

      // Commitment
      if (data.commitmentIds && data.commitmentIds.length > 0) {
        product.commitments = []

        data.commitmentIds.forEach((commitmentId) => {
          const commitment = new ProductCommitment()
          commitment.id = commitmentId

          product.commitments.push(commitment)
        })
      }

      // Addition
      if (data.additionIds && data.additionIds.length > 0) {
        product.additions = []

        data.additionIds.forEach((additionId) => {
          const addition = new ProductAddition()
          addition.id = additionId

          product.additions.push(addition)
        })
      }

      // Skus
      if (data.skus && data.skus.length > 0) {
        delete product.skus

        await this.updateSkus(id, data.skus).then(() => {
          // 超过 1 个 SKU，则为多规格
          product.isMultiSkus = data.skus.length > 1 ? YesOrNo.YES : YesOrNo.NO
          // 取最低价
          product.price = data.skus.reduce((a, b) => a.price < b.price ? a : b).price
          // 合计库存
          product.inventory = data.skus.reduce((a, b) => a + b.inventory, 0)
        })
      }

      await this.repository.save(product)

      this.event.emit(
        toEventName(ProductUpdatedEvent.name),
        new ProductUpdatedEvent(id, product.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品', e.message, e.status)
    }
  }

  /**
   * 更新商品 SKU
   *
   * @param id 商品 ID
   * @param skus SKU 列表
   * @throws {NotFoundException} 商品信息不存在
   * @throws {FailedException} 更新商品 SKU 失败
   */
  async updateSkus(id: number, skus: ProductSkuPayload[]) {
    try {
      const product = await this.repository.findOne({
        select: [
          'id',
          'uuid',
          'skus',
        ],
        where: {
          id,
          isDeleted: YesOrNo.NO,
          status: Not(ProductStatus.ON_SALE), // 不允许更新已上架的商品
        },
        relations: ['skus'],
      })

      if (!product)
        throw new NotFoundException('商品信息')

      // Skus
      if (skus.length) {
        const updateSkus: IProductSku[] = []

        skus.forEach((sku, index) => {
          const updateSku = product.skus.find(s => s.id === sku.id) || new ProductSku()

          updateSku.name = sku.name
          updateSku.skuCode = sku.skuCode
          updateSku.attributes = sku.attributes
          updateSku.image = sku.image
          updateSku.price = sku.price
          updateSku.originalPrice = sku.originalPrice
          updateSku.costPrice = sku.costPrice
          updateSku.inventory = sku.inventory
          updateSku.inventoryEarlyWarning = sku.inventoryEarlyWarning
          updateSku.weight = sku.weight
          updateSku.volume = sku.volume
          updateSku.unit = sku.unit

          if (!sku.id) {
            updateSku.uuid = uuid()
            updateSku.productId = id
            updateSku.productUuid = product.uuid
            updateSku.skuCode = nanoSkuCode(index)
          }

          updateSkus.push(updateSku)
        })

        // ! Transaction
        await this.repository.manager.transaction(async (manager) => {
          await manager.delete(ProductSku, { productId: id })
          await manager.save(ProductSku, updateSkus, { reload: false })
        })
      }
    }
    catch (e) {
      throw new FailedException(`更新商品 SKU ${e.message}`, e.status)
    }
  }

  /**
   * 复制商品至草稿
   *
   * @param id 复制商品 ID
   * @returns 新商品 ID
   * @throws {NotFoundException} 商品不存在
   * @throws {FailedException} 复制商品失败
   * @event ProductCopiedEvent
   */
  async copyToDraft(id: number): Promise<number> {
    try {
      const product = await this.repository.findOne({
        where: { id },
        relations: ['categories', 'group', 'tag', 'brand', 'commitments', 'additions', 'skus'],
      })

      if (!product)
        throw new NotFoundException('商品')

      const draft = new Product()

      draft.uuid = uuid()
      draft.type = product.type
      draft.source = ProductSource.MANUAL
      draft.status = ProductStatus.DRAFT
      draft.tagId = product.tagId
      draft.groupId = product.groupId
      draft.brandId = product.brandId
      draft.name = `${product.name} (复制)`
      draft.desc = product.desc
      draft.slogan = product.slogan
      draft.images = product.images
      draft.video = product.video
      draft.attributes = product.attributes
      draft.enableVipDiscount = product.enableVipDiscount
      draft.enablePurchaseLimits = product.enablePurchaseLimits
      draft.purchaseMaxQty = product.purchaseMaxQty
      draft.purchaseMinQty = product.purchaseMinQty
      draft.inventoryDeductMode = product.inventoryDeductMode
      draft.deliveryMethods = product.deliveryMethods
      draft.freightChargeMode = product.freightChargeMode
      draft.freight = product.freight
      draft.freightTemplateId = product.freightTemplateId
      draft.returnsFreightBy = product.returnsFreightBy
      draft.publishMode = product.publishMode
      draft.autoInStockAt = product.autoInStockAt
      draft.buyBtnNameType = product.buyBtnNameType
      draft.buyBtnName = product.buyBtnName
      draft.detail = product.detail
      draft.isMultiSkus = product.isMultiSkus
      draft.price = product.price
      draft.inventory = product.inventory

      // Category
      if (product.categories.length) {
        draft.categories = []

        product.categories.forEach((item) => {
          const cate = new ProductCategory()
          cate.id = item.id

          draft.categories.push(cate)
        })
      }

      // Commitment
      if (product.commitments.length) {
        draft.commitments = []

        product.commitments.forEach((item) => {
          const commitment = new ProductCommitment()
          commitment.id = item.id

          draft.commitments.push(commitment)
        })
      }

      // Addition
      if (product.additions.length) {
        draft.additions = []

        product.additions.forEach((item) => {
          const addition = new ProductAddition()
          addition.id = item.id

          draft.additions.push(addition)
        })
      }

      // Skus
      if (product.skus.length) {
        draft.skus = []

        product.skus.forEach((sku, index) => {
          sku.id = undefined
          sku.productId = undefined

          sku.uuid = uuid()
          sku.skuCode = nanoSkuCode(index)
          sku.productUuid = draft.uuid

          draft.skus.push(sku)
        })
      }

      const created = await this.repository.save(draft, { transaction: true })

      this.event.emit(
        toEventName(ProductCopiedEvent.name),
        new ProductCopiedEvent(id, created.id, product.name),
      )

      return created.id
    }
    catch (e) {
      throw new FailedException(`复制商品${e.message}`, e.status)
    }
  }

  /**
   * 同步 SKU 价格库存
   *
   * @param id 商品 ID
   * @param skus 商品 SKU 更新
   * @throws {NotFoundException} 商品信息不存在
   * @throws {FailedException} 同步 SKU 价格库存失败
   */
  async syncFromSkus(id: number, skus: ProductSkuPayload[]) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('商品信息')

      const product = new Product()

      product.id = id
      // 超过 1 个 SKU，则为多规格
      product.isMultiSkus = skus.length > 1 ? YesOrNo.YES : YesOrNo.NO
      // 取最低价
      product.price = skus.reduce((a, b) => a.price < b.price ? a : b).price
      // 合计库存
      product.inventory = skus.reduce((a, b) => a + b.inventory, 0)

      await this.repository.save(product)
    }
    catch (e) {
      throw new FailedException('同步 SKU 价格库存', e.message, e.status)
    }
  }

  /**
   * 批量更新商品属性
   *
   * @param ids 商品 ID 数组
   * @param data 商品属性
   * @throws {FailedException} 批量更新商品属性失败
   * @event ProductPropertiesUpdatedEvent
   */
  async batchUpdateProperties(ids: number[], data: UpdateProductPropertiesPayload) {
    try {
      const products = await this.repository.find({
        select: [
          'id',
          'groupId',
          'brandId',
          'tagId',
          'enablePurchaseLimits',
          'enableVipDiscount',
          'purchaseMaxQty',
          'purchaseMinQty',
          'inventoryDeductMode',
          'deliveryMethods',
          'freightChargeMode',
          'freight',
          'freightTemplateId',
          'returnsFreightBy',
          'buyBtnNameType',
          'buyBtnName',
        ],
        where: {
          id: In(ids),
        },
        relations: ['categories', 'commitments', 'additions'],
      })

      if (products.length) {
        for (const product of products) {
          if (data.enablePurchaseLimits)
            product.enablePurchaseLimits = data.enablePurchaseLimits

          if (data.enableVipDiscount)
            product.enableVipDiscount = data.enableVipDiscount

          if (data.purchaseMaxQty !== undefined)
            product.purchaseMaxQty = data.purchaseMaxQty

          if (data.purchaseMinQty !== undefined)
            product.purchaseMinQty = data.purchaseMinQty

          if (data.inventoryDeductMode)
            product.inventoryDeductMode = data.inventoryDeductMode

          if (data.deliveryMethods)
            product.deliveryMethods = data.deliveryMethods

          if (data.freightChargeMode)
            product.freightChargeMode = data.freightChargeMode

          if (data.freight !== undefined)
            product.freight = data.freight

          if (data.freightTemplateId)
            product.freightTemplateId = data.freightTemplateId

          if (data.returnsFreightBy)
            product.returnsFreightBy = data.returnsFreightBy

          if (data.buyBtnNameType)
            product.buyBtnNameType = data.buyBtnNameType

          if (data.buyBtnName)
            product.buyBtnName = data.buyBtnName

          if (data.tagId)
            product.tagId = data.tagId

          if (data.groupId)
            product.groupId = data.groupId

          if (data.brandId)
            product.brandId = data.brandId

          // Category
          if (data.categoryIds && data.categoryIds.length > 0) {
            product.categories = []

            data.categoryIds.forEach((id) => {
              const cate = new ProductCategory()
              cate.id = id

              product.categories.push(cate)
            })
          }

          // Commitment
          if (data.commitmentIds && data.commitmentIds.length > 0) {
            product.commitments = []

            data.commitmentIds.forEach((id) => {
              const commitment = new ProductCommitment()
              commitment.id = id

              product.commitments.push(commitment)
            })
          }

          // Addition
          if (data.additionIds && data.additionIds.length > 0) {
            product.additions = []

            data.additionIds.forEach((id) => {
              const addition = new ProductAddition()
              addition.id = id

              product.additions.push(addition)
            })
          }
        }
      }

      await this.repository.save(products, { transaction: true })

      this.event.emit(
        toEventName(ProductPropertiesUpdatedEvent.name),
        new ProductPropertiesUpdatedEvent(ids, data),
      )
    }
    catch (e) {
      throw new FailedException('批量更新商品属性', e.message)
    }
  }

  /**
   * 批量更新商品状态
   *
   * @param ids 商品 ID 数组
   * @param status 商品状态
   * @throws {FailedException} 批量更新商品状态失败
   * @event ProductStatusUpdatedEvent
   */
  async batchUpdateStatus(ids: number[], status: IProductStatus) {
    try {
      await this.repository.update({
        id: In(ids),
        isDeleted: YesOrNo.NO,
      }, {
        status,
        onSaleTime: status === ProductStatus.ON_SALE ? nowStr() : null,
        stockedTime: status === ProductStatus.STOCKED ? nowStr() : null,
        soldOutTime: status === ProductStatus.SOLD_OUT ? nowStr() : null,
      })

      this.event.emit(
        toEventName(ProductStatusUpdatedEvent.name),
        new ProductStatusUpdatedEvent(ids, status),
      )
    }
    catch (e) {
      throw new FailedException('批量更新商品状态', e.message)
    }
  }

  /**
   * 更新库存预警状态
   *
   * @param ids 商品 ID 数组
   * @param status 状态
   * @throws {FailedException} 更新库存预警状态失败
   */
  async updateWarningStatus(ids: number[], status: IYesOrNo) {
    try {
      await this.repository.update({
        id: In(ids),
        isDeleted: YesOrNo.NO,
      }, {
        isWarning: status,
      })
    }
    catch (e) {
      throw new FailedException('更新库存预警状态', e.message)
    }
  }

  /**
   * 下架售罄商品 (定时任务)
   *
   * @throws {FailedException} 下架售罄商品失败
   * @event ProductSoldOutEvent
   */
  async updateSoldOutProducts() {
    try {
      const products = await this.repository.find({
        select: ['id', 'name'],
        where: {
          isDeleted: YesOrNo.NO,
          status: ProductStatus.ON_SALE,
          inventory: LessThanOrEqual(0),
        },
        order: {
          createdTime: 'DESC',
        },
      })

      if (products.length > 0) {
        await this.repository.update(
          { id: In(products.map(i => i.id)) },
          {
            status: ProductStatus.SOLD_OUT,
            soldOutTime: nowStr(),
          },
        )

        for (const product of products) {
          this.event.emit(
            toEventName(ProductSoldOutEvent.name),
            new ProductSoldOutEvent(product.id, product.name),
          )
        }
      }
    }
    catch (e) {
      throw new FailedException('下架售罄商品', e.message)
    }
  }

  /**
   * 自动上架商品 (定时任务)
   *
   * @throws {FailedException} 自动上架商品失败
   * @event ProductStatusUpdatedEvent
   */
  async updateAutoInStock() {
    try {
      const products = await this.repository.find({
        select: ['id'],
        where: {
          isDeleted: YesOrNo.NO,
          status: ProductStatus.STOCKED,
          publishMode: ProductPublishMode.AUTO,
          autoInStockAt: LessThanOrEqual(nowStr()),
        },
        order: {
          createdTime: 'DESC',
        },
      })

      if (products.length === 0)
        return

      await this.batchUpdateStatus(
        products.map(i => i.id),
        ProductStatus.ON_SALE,
      )
    }
    catch (e) {
      throw new FailedException('自动上架商品', e.message)
    }
  }

  /**
   * 删除商品 (软删除)
   *
   * @param ids 商品 ID 数组
   * @throws {FailedException} 删除商品失败
   * @event ProductDeletedEvent
   */
  async softDelete(ids: number[]) {
    try {
      const products = await this.repository.find({
        select: ['id', 'name'],
        where: {
          id: In(ids),
          isDeleted: YesOrNo.NO,
        },
      })

      if (products.length === 0)
        return

      await this.repository.update({
        id: In(products.map(i => i.id)),
      }, {
        isDeleted: YesOrNo.YES,
        deletedTime: nowStr(),
      })

      for (const product of products) {
        this.event.emit(
          toEventName(ProductDeletedEvent.name),
          new ProductDeletedEvent(product.id, product.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品', e.message)
    }
  }

  /**
   * 恢复商品
   *
   * @param ids 商品 ID 数组
   * @throws {FailedException} 恢复商品失败
   * @event ProductRestoredEvent
   */
  async restore(ids: number[]) {
    try {
      const products = await this.repository.find({
        select: ['id', 'name'],
        where: {
          id: In(ids),
          isDeleted: YesOrNo.YES,
        },
      })

      if (products.length === 0)
        return

      await this.repository.update({
        id: In(products.map(i => i.id)),
      }, {
        status: ProductStatus.DRAFT,
        isDeleted: YesOrNo.NO,
        deletedTime: null,
      })

      for (const product of products) {
        this.event.emit(
          toEventName(ProductRestoredEvent.name),
          new ProductRestoredEvent(product.id, product.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('恢复商品', e.message)
    }
  }

  /**
   * 删除商品 (硬删除)
   *
   * @param ids 商品 ID 数组
   * @throws {FailedException} 删除商品失败
   * @event ProductDeletedEvent
   */
  async delete(ids: number[]) {
    try {
      const products = await this.repository.find({
        select: ['id', 'name'],
        where: {
          id: In(ids),
          isDeleted: YesOrNo.YES,
        },
      })

      if (products.length === 0)
        return

      await this.repository.delete({
        id: In(products.map(i => i.id)),
      })

      for (const product of products) {
        this.event.emit(
          toEventName(ProductDeletedEvent.name),
          new ProductDeletedEvent(product.id, product.name, true),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品', e.message)
    }
  }

  /**
   * 清空回收站
   *
   * @throws {FailedException} 清空回收站失败
   * @event ProductTrashClearedEvent
   */
  async emptyTrash() {
    try {
      const { affected } = await this.repository.delete({
        isDeleted: YesOrNo.YES,
      })

      if (affected === 0)
        return

      this.event.emit(
        toEventName(ProductTrashClearedEvent.name),
        new ProductTrashClearedEvent(affected),
      )
    }
    catch (e) {
      throw new FailedException('清空回收站', e.message)
    }
  }
}
