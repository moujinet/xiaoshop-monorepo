import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductTagEntity } from './entity'

export type IProductTagSelect = FindManyOptions<ProductTagEntity>['select']
export type IProductTagWhere = FindManyOptions<ProductTagEntity>['where']

export interface IProductTagRepository<T = ProductTagEntity> {
  /**
   * 查询商品标签分页列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品标签分页列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品标签列表
   *
   * @param select 查询字段
   * @returns 商品标签列表
   */
  find: (select?: IProductTagSelect) => Promise<T[]>

  /**
   * 根据条件查询商品标签
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品标签
   */
  findOne: (where: IProductTagWhere, select?: IProductTagSelect) => Promise<T>

  /**
   * 根据 ID 查询商品标签
   *
   * @param id 商品标签 ID
   * @param select 查询字段
   * @returns 商品标签
   */
  findById: (id: number, select?: IProductTagSelect) => Promise<T>

  /**
   * 判断商品标签是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductTagWhere) => Promise<boolean>

  /**
   * 创建商品标签
   *
   * @param data 商品标签
   * @returns 保存后的商品标签
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品标签
   *
   * @param tag 商品标签
   * @param data 更新信息
   * @returns 保存后的商品标签
   */
  update: (tag: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品标签
   *
   * @param id 商品标签 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品标签实例
   *
   * @param entity 实例数据
   * @returns 商品标签实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
