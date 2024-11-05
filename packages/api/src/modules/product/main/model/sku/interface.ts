import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductSkuEntity } from './entity'

export type IProductSkuSelect = FindManyOptions<ProductSkuEntity>['select']
export type IProductSkuWhere = FindManyOptions<ProductSkuEntity>['where']

export interface IProductSkuRepository<T = ProductSkuEntity> {
  /**
   * 查询商品多规格信息列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品多规格信息列表
   */
  find: (where: IProductSkuWhere, select?: IProductSkuSelect) => Promise<T[]>

  /**
   * 根据条件查询商品多规格信息
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品多规格信息
   */
  findOne: (where: IProductSkuWhere, select?: IProductSkuSelect) => Promise<T>

  /**
   * 根据 ID 查询商品多规格信息
   *
   * @param id 商品多规格信息 ID
   * @param select 查询字段
   * @returns 商品多规格信息
   */
  findById: (id: number, select?: IProductSkuSelect) => Promise<T>

  /**
   * 判断商品多规格信息是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductSkuWhere) => Promise<boolean>

  /**
   * 创建商品多规格信息
   *
   * @param rows 商品多规格信息
   * @returns 保存后的商品多规格信息
   */
  create: (rows: Partial<T>[]) => Promise<T[]>

  /**
   * 更新商品多规格信息
   *
   * @param skus 商品多规格信息
   * @param rows 更新信息
   * @returns 保存后的商品多规格信息
   */
  update: (skus: T[], rows: Partial<T>[]) => Promise<T[]>

  /**
   * 创建商品多规格信息实例
   *
   * @param entity 实例数据
   * @returns 商品多规格信息实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
