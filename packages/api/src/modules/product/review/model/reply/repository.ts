import type {
  IProductReviewReplyRepository,
  IProductReviewReplySelect,
  IProductReviewReplyWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { ProductReviewReplyEntity } from './entity'

const defaultSelect: IProductReviewReplySelect = ['id', 'reviewId', 'userId', 'content', 'createdTime']

@Injectable()
export class ProductReviewReplyRepository implements IProductReviewReplyRepository {
  constructor(
    @InjectRepository(ProductReviewReplyEntity)
    private readonly repo: Repository<ProductReviewReplyEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: IProductReviewReplyWhere,
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
      skip,
      take,
      order: {
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
    where: IProductReviewReplyWhere,
    select: IProductReviewReplySelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        createdTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IProductReviewReplyWhere,
    select: IProductReviewReplySelect = defaultSelect,
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
    select: IProductReviewReplySelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductReviewReplyWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductReviewReplyEntity>) {
    const reply = this.newEntity({
      reviewId: data.reviewId,
      userId: data.userId,
      content: data.content ? data.content.trim() : '',
    })

    return await this.repo.save(reply)
  }

  /**
   * @inheritdoc
   */
  async update(
    reply: ProductReviewReplyEntity,
    data: Partial<ProductReviewReplyEntity>,
  ) {
    const entity = this.newEntity({
      id: reply.id,
      reviewId: reply.reviewId,
      userId: reply.userId,
    })

    if (data.content && data.content !== reply.content)
      entity.content = data.content.trim()

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
  newEntity(entity?: DeepPartial<ProductReviewReplyEntity>): ProductReviewReplyEntity {
    return this.repo.create(entity)
  }
}
