import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductExportEntity } from './entity'

export type IProductExportSelect = FindManyOptions<ProductExportEntity>['select']
export type IProductExportWhere = FindManyOptions<ProductExportEntity>['where']

export interface IProductExportRepository<T = ProductExportEntity> {
  /**
   * 查询商品导出分页列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品导出分页列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品导出列表
   *
   * @param select 查询字段
   * @returns 商品导出列表
   */
  find: (select?: IProductExportSelect) => Promise<T[]>

  /**
   * 根据条件查询商品导出
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品导出
   */
  findOne: (where: IProductExportWhere, select?: IProductExportSelect) => Promise<T>

  /**
   * 根据 ID 查询商品导出
   *
   * @param id 商品导出 ID
   * @param select 查询字段
   * @returns 商品导出
   */
  findById: (id: number, select?: IProductExportSelect) => Promise<T>

  /**
   * 判断商品导出是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductExportWhere) => Promise<boolean>

  /**
   * 创建商品导出
   *
   * @param data 商品导出
   * @returns 保存后的商品导出
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品导出
   *
   * @param entity 商品导出
   * @param data 更新信息
   * @returns 保存后的商品导出
   */
  update: (entity: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品导出
   *
   * @param id 商品导出 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品导出实例
   *
   * @param entity 实例数据
   * @returns 商品导出实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
