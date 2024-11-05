import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductEntity } from './entity'

export type IProductSelect = FindManyOptions<ProductEntity>['select']
export type IProductWhere = FindManyOptions<ProductEntity>['where']
export type IProductRelations = FindManyOptions<ProductEntity>['relations']

export interface IProductRepository<T = ProductEntity> {
  /**
   * 查询商品信息分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品信息分页列表
   */
  findAndCount: (where: IProductWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品信息列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品信息列表
   */
  find: (where: IProductWhere, select?: IProductSelect) => Promise<T[]>

  /**
   * 根据条件查询商品信息
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品信息
   */
  findOne: (where: IProductWhere, select?: IProductSelect) => Promise<T>

  /**
   * 根据 ID 查询商品信息
   *
   * @param id 商品信息 ID
   * @param select 查询字段
   * @returns 商品信息
   */
  findById: (id: number, select?: IProductSelect) => Promise<T>

  /**
   * 判断商品信息是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductWhere) => Promise<boolean>

  /**
   * 创建商品信息
   *
   * @param data 商品信息
   * @returns 保存后的商品信息
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品信息
   *
   * @param product 商品信息
   * @param data 更新信息
   * @returns 保存后的商品信息
   */
  update: (product: T, data: Partial<T>) => Promise<T>

  /**
   * 批量更新商品信息
   *
   * @param data 更新信息
   * @returns 保存后的商品信息
   */
  updateMany: (data: Partial<T>[]) => Promise<T[]>

  /**
   * 删除商品信息
   *
   * @param id 商品信息 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品信息实例
   *
   * @param entity 实例数据
   * @returns 商品信息实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
