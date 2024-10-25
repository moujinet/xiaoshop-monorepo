import type { FindManyOptions } from 'typeorm'
import type { IApiPaginationData } from '@xiaoshop/shared'

import { AssetResourceEntity } from './entity'

export type IAssetResourceSelect = FindManyOptions<AssetResourceEntity>['select']
export type IAssetResourceWhere = FindManyOptions<AssetResourceEntity>['where']

export interface IAssetResourceRepository<T = AssetResourceEntity> {
  /**
   * 查询素材分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 素材分页列表
   */
  findAndCount: (where: IAssetResourceWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 根据 ID 查询素材
   *
   * @param id 素材 ID
   * @returns 素材
   */
  findById: (id: number, select?: IAssetResourceSelect) => Promise<T>

  /**
   * 判断素材是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IAssetResourceWhere) => Promise<boolean>

  /**
   * 创建素材
   *
   * @param data 素材
   * @returns 保存后的素材
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 删除素材
   *
   * @param id 素材 ID
   */
  destroy: (id: number) => Promise<void>
}
