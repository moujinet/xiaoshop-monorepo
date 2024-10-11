import type { ISystemSettingMap } from '@xiaoshop/shared'
import type { ISystemSettingRepository } from '@/system/setting/model/interface'

import { Injectable } from '@nestjs/common'

import { SystemSettingMapper } from '@/system/setting/model/mapper'
import { SystemSettingRepo } from '@/system/setting/model/provider'
import { FailedException, NotFoundException } from '~/common/exceptions'

@Injectable()
export class SystemSettingReadService {
  constructor(
    @SystemSettingRepo()
    private readonly repo: ISystemSettingRepository,
  ) {}

  /**
   * 获取所有系统设置
   *
   * @returns 所有系统设置
   * @throws {FailedException} 获取系统设置失败
   */
  async findAll(): Promise<ISystemSettingMap> {
    try {
      return await this.repo.findAll().then(
        settings => SystemSettingMapper.create(settings).toMap(),
      )
    }
    catch (e) {
      throw new FailedException('获取系统设置', e.message)
    }
  }

  /**
   * 根据系统设置键获取系统设置
   *
   * @param key 系统设置键
   * @returns 系统设置
   * @throws {FailedException} 获取系统设置失败
   */
  async find(key: string): Promise<ISystemSettingMap> {
    try {
      return await this.repo.findByKey(key).then(
        settings => SystemSettingMapper.create(settings).toMap(),
      )
    }
    catch (e) {
      throw new FailedException('获取系统设置', e.message)
    }
  }

  /**
   * 根据系统设置键获取系统设置值
   *
   * @param key 系统设置键
   * @returns 系统设置值
   * @throws {FailedException} 获取系统设置值失败
   * @throws {NotFoundException} 系统设置不存在
   */
  async findValue<T = string>(key: string): Promise<T> {
    try {
      const setting = await this.repo.findOne(key)

      if (!setting)
        throw new NotFoundException('系统设置不存在')

      return SystemSettingMapper.toTypedValue(setting) as T
    }
    catch (e) {
      throw new FailedException('获取系统设置值', e.message)
    }
  }
}
