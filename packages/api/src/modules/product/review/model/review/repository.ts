import type {
  IProductReviewRepository,
  IProductReviewSelect,
  IProductReviewWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductReviewStatus } from '@xiaoshop/shared'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { ProductReviewEntity } from './entity'

const defaultSelect: IProductReviewSelect = {
  id: true,
  productId: true,
  product: {
    id: true,
    connectId: true,
    name: true,
    desc: true,
    images: true,
  },
  memberId: true,
  productScore: true,
  serviceScore: true,
  logisticsScore: true,
  status: true,
  images: true,
  content: true,
  createdTime: true,
}

@Injectable()
export class ProductReviewRepository implements IProductReviewRepository {
  constructor(
    @InjectRepository(ProductReviewEntity)
    private readonly repo: Repository<ProductReviewEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: IProductReviewWhere,
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: defaultSelect,
      where,
      relations: ['product'],
      skip,
      take,
      order: {
        productId: 'DESC',
        status: 'DESC',
        createdTime: 'DESC',
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
    where: IProductReviewWhere,
    select: IProductReviewSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      relations: ['product'],
      order: {
        productId: 'DESC',
        status: 'DESC',
        createdTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IProductReviewWhere,
    select: IProductReviewSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where,
      relations: ['product'],
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select: IProductReviewSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      relations: ['product'],
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductReviewWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductReviewEntity>) {
    const review = this.newEntity({
      productId: data.productId,
      memberId: data.memberId,
    })

    review.productScore = data.productScore || 5
    review.serviceScore = data.serviceScore || 5
    review.logisticsScore = data.logisticsScore || 5
    review.status = data.status || ProductReviewStatus.PENDING
    review.images = data.images || []
    review.content = data.content ? data.content.trim() : ''

    return await this.repo.save(review)
  }

  /**
   * @inheritdoc
   */
  async update(
    review: ProductReviewEntity,
    data: Partial<ProductReviewEntity>,
  ) {
    const entity = this.newEntity({
      id: review.id,
      productId: review.productId,
      memberId: review.memberId,
    })

    if (data.productScore !== undefined && data.productScore !== review.productScore)
      entity.productScore = data.productScore

    if (data.serviceScore !== undefined && data.serviceScore !== review.serviceScore)
      entity.serviceScore = data.serviceScore

    if (data.logisticsScore !== undefined && data.logisticsScore !== review.logisticsScore)
      entity.logisticsScore = data.logisticsScore

    if (data.status !== undefined && data.status !== review.status)
      entity.status = data.status

    if (data.images !== undefined && data.images !== review.images)
      entity.images = data.images

    if (data.content && data.content !== review.content)
      entity.content = data.content

    return await this.repo.save(entity)
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
  newEntity(entity?: DeepPartial<ProductReviewEntity>): ProductReviewEntity {
    return this.repo.create(entity)
  }
}
