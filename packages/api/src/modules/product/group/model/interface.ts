import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductGroupEntity } from './entity'

export type IProductGroupSelect = FindManyOptions<ProductGroupEntity>['select']
export type IProductGroupWhere = FindManyOptions<ProductGroupEntity>['where']

export interface IProductGroupRepository<T = ProductGroupEntity> {
  /**
   * 查询商品分组分页列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品分组分页列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品分组列表
   *
   * @param select 查询字段
   * @returns 商品分组列表
   */
  find: (select?: IProductGroupSelect) => Promise<T[]>

  /**
   * 根据条件查询商品分组
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品分组
   */
  findOne: (where: IProductGroupWhere, select?: IProductGroupSelect) => Promise<T>

  /**
   * 根据 ID 查询商品分组
   *
   * @param id 商品分组 ID
   * @param select 查询字段
   * @returns 商品分组
   */
  findById: (id: number, select?: IProductGroupSelect) => Promise<T>

  /**
   * 判断商品分组是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductGroupWhere) => Promise<boolean>

  /**
   * 创建商品分组
   *
   * @param data 商品分组
   * @returns 保存后的商品分组
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品分组
   *
   * @param group 商品分组
   * @param data 更新信息
   * @returns 保存后的商品分组
   */
  update: (group: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品分组
   *
   * @param id 商品分组 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品分组实例
   *
   * @param entity 实例数据
   * @returns 商品分组实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
