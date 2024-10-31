import type { DeepPartial, FindManyOptions } from 'typeorm'

import { LogisticAddressEntity } from './entity'

export type ILogisticAddressSelect = FindManyOptions<LogisticAddressEntity>['select']
export type ILogisticAddressWhere = FindManyOptions<LogisticAddressEntity>['where']

export interface ILogisticAddressRepository<T = LogisticAddressEntity> {
  /**
   * 查询收货地址信息列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 收货地址信息列表
   */
  find: (where: ILogisticAddressWhere, select?: ILogisticAddressSelect) => Promise<T[]>

  /**
   * 根据条件查询收货地址信息
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 收货地址信息
   */
  findOne: (where: ILogisticAddressWhere, select?: ILogisticAddressSelect) => Promise<T>

  /**
   * 根据 ID 查询收货地址信息
   *
   * @param id 收货地址信息 ID
   * @param select 查询字段
   * @returns 收货地址信息
   */
  findById: (id: number, select?: ILogisticAddressSelect) => Promise<T>

  /**
   * 判断收货地址信息是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: ILogisticAddressWhere) => Promise<boolean>

  /**
   * 创建收货地址信息
   *
   * @param data 收货地址信息
   * @returns 保存后的收货地址信息
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新收货地址信息
   *
   * @param address 收货地址信息
   * @param data 更新信息
   * @returns 保存后的收货地址信息
   */
  update: (address: T, data: Partial<T>) => Promise<T>

  /**
   * 删除收货地址信息
   *
   * @param id 收货地址信息 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建收货地址信息实例
   *
   * @param entity 实例数据
   * @returns 收货地址信息实例
   */
  newEntity: (entity: DeepPartial<T>) => T
}
