import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { LogisticExpressEntity } from './entity'

export type ILogisticExpressSelect = FindManyOptions<LogisticExpressEntity>['select']
export type ILogisticExpressWhere = FindManyOptions<LogisticExpressEntity>['where']

export interface ILogisticExpressRepository<T = LogisticExpressEntity> {
  /**
   * 查询快递公司分页列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 快递公司分页列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询快递公司列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 快递公司列表
   */
  find: (where: ILogisticExpressWhere, select?: ILogisticExpressSelect) => Promise<T[]>

  /**
   * 根据条件查询快递公司
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 快递公司
   */
  findOne: (where: ILogisticExpressWhere, select?: ILogisticExpressSelect) => Promise<T>

  /**
   * 根据 ID 查询快递公司
   *
   * @param id 快递公司 ID
   * @param select 查询字段
   * @returns 快递公司
   */
  findById: (id: number, select?: ILogisticExpressSelect) => Promise<T>

  /**
   * 判断快递公司是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: ILogisticExpressWhere) => Promise<boolean>

  /**
   * 创建快递公司
   *
   * @param data 快递公司
   * @returns 保存后的快递公司
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新快递公司
   *
   * @param express 快递公司
   * @param data 更新信息
   * @returns 保存后的快递公司
   */
  update: (express: T, data: Partial<T>) => Promise<T>

  /**
   * 删除快递公司
   *
   * @param id 快递公司 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建快递公司实例
   *
   * @param entity 实例数据
   * @returns 快递公司实例
   */
  newEntity: (entity: DeepPartial<T>) => T
}
