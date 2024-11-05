import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductReviewEntity } from './entity'

export type IProductReviewSelect = FindManyOptions<ProductReviewEntity>['select']
export type IProductReviewWhere = FindManyOptions<ProductReviewEntity>['where']

export interface IProductReviewRepository<T = ProductReviewEntity> {
  /**
   * 查询商品评价分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品评价分页列表
   */
  findAndCount: (where: IProductReviewWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品评价列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品评价列表
   */
  find: (where: IProductReviewWhere, select?: IProductReviewSelect) => Promise<T[]>

  /**
   * 根据条件查询商品评价
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品评价
   */
  findOne: (where: IProductReviewWhere, select?: IProductReviewSelect) => Promise<T>

  /**
   * 根据 ID 查询商品评价
   *
   * @param id 商品评价 ID
   * @param select 查询字段
   * @returns 商品评价
   */
  findById: (id: number, select?: IProductReviewSelect) => Promise<T>

  /**
   * 判断商品评价是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductReviewWhere) => Promise<boolean>

  /**
   * 创建商品评价
   *
   * @param data 商品评价
   * @returns 保存后的商品评价
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品评价
   *
   * @param review 商品评价
   * @param data 更新信息
   * @returns 保存后的商品评价
   */
  update: (review: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品评价
   *
   * @param id 商品评价 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品评价实例
   *
   * @param entity 实例数据
   * @returns 商品评价实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
