import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductServiceAdditionEntity } from './entity'

export type IProductServiceAdditionSelect = FindManyOptions<ProductServiceAdditionEntity>['select']
export type IProductServiceAdditionWhere = FindManyOptions<ProductServiceAdditionEntity>['where']

export interface IProductServiceAdditionRepository<T = ProductServiceAdditionEntity> {
  /**
   * 查询商品服务分页列表
   *
   * @param select 查询字段
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品服务分页列表
   */
  findAndCount: (select: IProductServiceAdditionSelect, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品服务列表
   *
   * @param select 查询字段
   * @returns 商品服务列表
   */
  find: (select?: IProductServiceAdditionSelect) => Promise<T[]>

  /**
   * 根据条件查询商品服务
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品服务
   */
  findOne: (where: IProductServiceAdditionWhere, select?: IProductServiceAdditionSelect) => Promise<T>

  /**
   * 根据 ID 查询商品服务
   *
   * @param id 商品服务 ID
   * @param select 查询字段
   * @returns 商品服务
   */
  findById: (id: number, select?: IProductServiceAdditionSelect) => Promise<T>

  /**
   * 判断商品服务是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductServiceAdditionWhere) => Promise<boolean>

  /**
   * 创建商品服务
   *
   * @param data 商品服务
   * @returns 保存后的商品服务
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品服务
   *
   * @param service 商品服务
   * @param data 更新信息
   * @returns 保存后的商品服务
   */
  update: (service: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品服务
   *
   * @param id 商品服务 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品服务实例
   *
   * @param entity 实例数据
   * @returns 商品服务实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
