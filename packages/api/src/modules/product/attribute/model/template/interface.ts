import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { ProductAttributeTemplateEntity } from './entity'

export type IProductAttributeTemplateSelect = FindManyOptions<ProductAttributeTemplateEntity>['select']
export type IProductAttributeTemplateWhere = FindManyOptions<ProductAttributeTemplateEntity>['where']

export interface IProductAttributeTemplateRepository<T = ProductAttributeTemplateEntity> {
  /**
   * 查询商品参数模板分页列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 商品参数模板分页列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询商品参数模板列表
   *
   * @param select 查询字段
   * @returns 商品参数模板列表
   */
  find: (select?: IProductAttributeTemplateSelect) => Promise<T[]>

  /**
   * 根据条件查询商品参数模板
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 商品参数模板
   */
  findOne: (where: IProductAttributeTemplateWhere, select?: IProductAttributeTemplateSelect) => Promise<T>

  /**
   * 根据 ID 查询商品参数模板
   *
   * @param id 商品参数模板 ID
   * @param select 查询字段
   * @returns 商品参数模板
   */
  findById: (id: number, select?: IProductAttributeTemplateSelect) => Promise<T>

  /**
   * 判断商品参数模板是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IProductAttributeTemplateWhere) => Promise<boolean>

  /**
   * 创建商品参数模板
   *
   * @param data 商品参数模板
   * @returns 保存后的商品参数模板
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新商品参数模板
   *
   * @param template 商品参数模板
   * @param data 更新信息
   * @returns 保存后的商品参数模板
   */
  update: (template: T, data: Partial<T>) => Promise<T>

  /**
   * 删除商品参数模板
   *
   * @param id 商品参数模板 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建商品参数模板实例
   *
   * @param entity 实例数据
   * @returns 商品参数模板实例
   */
  newEntity: (entity?: DeepPartial<T>) => T
}
