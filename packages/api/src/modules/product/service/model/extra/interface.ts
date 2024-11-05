import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductServiceExtraEntity } from './entity'

export type IProductServiceExtraSelect = FindManyOptions<ProductServiceExtraEntity>['select']
export type IProductServiceExtraWhere = FindManyOptions<ProductServiceExtraEntity>['where']

export interface IProductServiceExtraRepository<T = ProductServiceExtraEntity> {
  /**
   * 查询商品服务保障分页列表
   *
   * @param select 查询字段
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品服务保障分页列表
   */
  findAndCount: (select: IProductServiceExtraSelect, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品服务保障列表
   *
   * @param select 查询字段
   * @returns 商品服务保障列表
   */
  find: (select?: IProductServiceExtraSelect) => Promise<T[]>

  /**
   * 根据条件查询商品服务保障
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品服务保障
   */
  findOne: (where: IProductServiceExtraWhere, select?: IProductServiceExtraSelect) => Promise<T>

  /**
   * 根据 ID 查询商品服务保障
   *
   * @param id 商品服务保障 ID
   * @param select 查询字段
   * @returns 商品服务保障
   */
  findById: (id: number, select?: IProductServiceExtraSelect) => Promise<T>

  /**
   * 判断商品服务保障是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductServiceExtraWhere) => Promise<boolean>

  /**
   * 创建商品服务保障
   *
   * @param data 商品服务保障
   * @returns 保存后的商品服务保障
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品服务保障
   *
   * @param service 商品服务保障
   * @param data 更新信息
   * @returns 保存后的商品服务保障
   */
  update: (service: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品服务保障
   *
   * @param id 商品服务保障 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品服务保障实例
   *
   * @param entity 实例数据
   * @returns 商品服务保障实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
