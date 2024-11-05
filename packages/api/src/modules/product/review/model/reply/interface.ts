import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductReviewReplyEntity } from './entity'

export type IProductReviewReplySelect = FindManyOptions<ProductReviewReplyEntity>['select']
export type IProductReviewReplyWhere = FindManyOptions<ProductReviewReplyEntity>['where']

export interface IProductReviewReplyRepository<T = ProductReviewReplyEntity> {
  /**
   * 查询商品评价回复分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品评价回复分页列表
   */
  findAndCount: (where: IProductReviewReplyWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品评价回复列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品评价回复列表
   */
  find: (where: IProductReviewReplyWhere, select?: IProductReviewReplySelect) => Promise<T[]>

  /**
   * 根据条件查询商品评价回复
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品评价回复
   */
  findOne: (where: IProductReviewReplyWhere, select?: IProductReviewReplySelect) => Promise<T>

  /**
   * 根据 ID 查询商品评价回复
   *
   * @param id 商品评价回复 ID
   * @param select 查询字段
   * @returns 商品评价回复
   */
  findById: (id: number, select?: IProductReviewReplySelect) => Promise<T>

  /**
   * 判断商品评价回复是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductReviewReplyWhere) => Promise<boolean>

  /**
   * 创建商品评价回复
   *
   * @param data 商品评价回复
   * @returns 保存后的商品评价回复
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品评价回复
   *
   * @param reply 商品评价回复
   * @param data 更新信息
   * @returns 保存后的商品评价回复
   */
  update: (reply: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品评价回复
   *
   * @param id 商品评价回复 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品评价回复实例
   *
   * @param entity 实例数据
   * @returns 商品评价回复实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
