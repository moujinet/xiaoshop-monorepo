import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductBrandEntity } from './entity'

export type IProductBrandSelect = FindManyOptions<ProductBrandEntity>['select']
export type IProductBrandWhere = FindManyOptions<ProductBrandEntity>['where']

export interface IProductBrandRepository<T = ProductBrandEntity> {
  /**
   * 查询商品品牌分页列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品品牌分页列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品品牌列表
   *
   * @param select 查询字段
   * @returns 商品品牌列表
   */
  find: (select?: IProductBrandSelect) => Promise<T[]>

  /**
   * 根据条件查询商品品牌
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品品牌
   */
  findOne: (where: IProductBrandWhere, select?: IProductBrandSelect) => Promise<T>

  /**
   * 根据 ID 查询商品品牌
   *
   * @param id 商品品牌 ID
   * @param select 查询字段
   * @returns 商品品牌
   */
  findById: (id: number, select?: IProductBrandSelect) => Promise<T>

  /**
   * 判断商品品牌是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductBrandWhere) => Promise<boolean>

  /**
   * 创建商品品牌
   *
   * @param data 商品品牌
   * @returns 保存后的商品品牌
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品品牌
   *
   * @param brand 商品品牌
   * @param data 更新信息
   * @returns 保存后的商品品牌
   */
  update: (brand: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品品牌
   *
   * @param id 商品品牌 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品品牌实例
   *
   * @param entity 实例数据
   * @returns 商品品牌实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
