import type { SystemSettingEntity } from './entity'

/**
 * 系统设置存储接口
 */
export interface ISystemSettingRepository {
  /**
   * 获取所有系统设置
   *
   * @returns 系统设置键值对
   */
  findAll: () => Promise<SystemSettingEntity[]>
  /**
   * 根据系统设置名称获得系统设置 (支持通配符)
   *
   * @param key 系统设置名称
   * @returns 系统设置键值对
   */
  findByKey: (key: string) => Promise<SystemSettingEntity[]>
  /**
   * 根据系统设置名称获得系统设置
   *
   * @param key 系统设置名称
   * @returns 系统设置
   */
  findOne: (key: string) => Promise<SystemSettingEntity>
  /**
   * 更新系统设置
   *
   * @param settings 系统设置列表
   */
  update: (settings: { key: string, value: string }[]) => Promise<void>
}
