import type { FindManyOptions } from 'typeorm'

import { AssetGroupEntity } from './entity'

export type IAssetGroupSelect = FindManyOptions<AssetGroupEntity>['select']
export type IAssetGroupWhere = FindManyOptions<AssetGroupEntity>['where']

export interface IAssetGroupRepository<T = AssetGroupEntity> {
  /**
   * 查询素材分组列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 素材分组列表
   */
  find: (where: IAssetGroupWhere, select?: IAssetGroupSelect) => Promise<T[]>

  /**
   * 根据 ID 查询素材分组
   *
   * @param id 素材分组 ID
   * @returns 素材分组
   */
  findById: (id: number, select?: IAssetGroupSelect) => Promise<T>

  /**
   * 判断素材分组是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IAssetGroupWhere) => Promise<boolean>

  /**
   * 创建素材分组
   *
   * @param data 素材分组
   * @returns 保存后的素材分组
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新素材分组
   *
   * @param role 素材分组
   * @param data 更新信息
   * @returns 保存后的素材分组
   */
  update: (role: T, data: Partial<T>) => Promise<T>

  /**
   * 删除素材分组
   *
   * @param id 素材分组 ID
   */
  destroy: (id: number) => Promise<void>
}
