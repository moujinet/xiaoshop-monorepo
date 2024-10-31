import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { LogisticFreightTemplateEntity } from './entity'

export type ILogisticFreightTemplateSelect = FindManyOptions<LogisticFreightTemplateEntity>['select']
export type ILogisticFreightTemplateWhere = FindManyOptions<LogisticFreightTemplateEntity>['where']

export interface ILogisticFreightTemplateRepository<T = LogisticFreightTemplateEntity> {
  /**
   * 查询运费模板分页列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 运费模板分页列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询运费模板列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 运费模板列表
   */
  find: (where: ILogisticFreightTemplateWhere, select?: ILogisticFreightTemplateSelect) => Promise<T[]>

  /**
   * 根据条件查询运费模板
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 运费模板
   */
  findOne: (where: ILogisticFreightTemplateWhere, select?: ILogisticFreightTemplateSelect) => Promise<T>

  /**
   * 根据 ID 查询运费模板
   *
   * @param id 运费模板 ID
   * @param select 查询字段
   * @returns 运费模板
   */
  findById: (id: number, select?: ILogisticFreightTemplateSelect) => Promise<T>

  /**
   * 判断运费模板是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: ILogisticFreightTemplateWhere) => Promise<boolean>

  /**
   * 创建运费模板
   *
   * @param data 运费模板
   * @returns 保存后的运费模板
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新运费模板
   *
   * @param template 运费模板
   * @param data 更新信息
   * @returns 保存后的运费模板
   */
  update: (template: T, data: Partial<T>) => Promise<T>

  /**
   * 删除运费模板
   *
   * @param id 运费模板 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建运费模板实例
   *
   * @param entity 实例数据
   * @returns 运费模板实例
   */
  newEntity: (entity: DeepPartial<T>) => T
}
