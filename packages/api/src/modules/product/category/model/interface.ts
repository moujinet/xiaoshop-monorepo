import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductCategoryEntity } from './entity'

export type IProductCategorySelect = FindManyOptions<ProductCategoryEntity>['select']
export type IProductCategoryWhere = FindManyOptions<ProductCategoryEntity>['where']

export interface IProductCategoryRepository<T = ProductCategoryEntity> {
  /**
   * 查询商品分类列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品分类列表
   */
  find: (where: IProductCategoryWhere, select?: IProductCategorySelect) => Promise<T[]>

  /**
   * 根据条件查询商品分类
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品分类
   */
  findOne: (where: IProductCategoryWhere, select?: IProductCategorySelect) => Promise<T>

  /**
   * 根据 ID 查询商品分类
   *
   * @param id 商品分类 ID
   * @param select 查询字段
   * @returns 商品分类
   */
  findById: (id: number, select?: IProductCategorySelect) => Promise<T>

  /**
   * 判断商品分类是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductCategoryWhere) => Promise<boolean>

  /**
   * 创建商品分类
   *
   * @param data 商品分类
   * @returns 保存后的商品分类
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品分类
   *
   * @param category 商品分类
   * @param data 更新信息
   * @returns 保存后的商品分类
   */
  update: (category: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品分类
   *
   * @param id 商品分类 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品分类实例
   *
   * @param entity 实例数据
   * @returns 商品分类实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
