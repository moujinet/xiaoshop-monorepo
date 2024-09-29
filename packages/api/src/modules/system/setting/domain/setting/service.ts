import type { ISystemSettingMap } from '@xiaoshop/shared'

import { Like, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isJSON, isNumberString } from 'class-validator'

import { FailedException } from '~/common/exceptions'
import { SystemSettingEntity } from '@/system/setting/entity'

@Injectable()
export class SystemSettingService {
  constructor(
    @InjectRepository(SystemSettingEntity)
    private readonly repo: Repository<SystemSettingEntity>,
  ) {}

  /**
   * 获取所有系统设置
   *
   * @returns 系统设置键值对
   */
  async findAll(): Promise<ISystemSettingMap> {
    try {
      return await this.repo.find({
        order: { key: 'ASC' },
      }).then(
        settings => this.conventToMap(settings),
      )
    }
    catch (e) {
      throw new FailedException('获取系统设置', e.message)
    }
  }

  /**
   * 根据系统设置名称获得系统设置 (支持通配符)
   *
   * @param key 系统设置名称
   * @returns 系统设置键值对
   */
  async findByKey(key: string): Promise<ISystemSettingMap> {
    try {
      const isWildcard = key.includes('.*')

      if (isWildcard)
        key = key.replace('.*', '')

      return await this.repo.find({
        where: { key: isWildcard ? Like(`${key}%`) : key },
        order: { key: 'ASC' },
      }).then(
        settings => this.conventToMap(settings),
      )
    }
    catch (e) {
      throw new FailedException('获取系统设置', e.message)
    }
  }

  /**
   * 根据系统设置名称获得系统设置值
   *
   * @param key 系统设置名称
   * @returns Promise<any>
   */
  async findValueByKey(key: string): Promise<any> {
    try {
      const setting = await this.repo.findOneBy({ key })

      return setting
        ? this.conventToTypedValue(setting)
        : null
    }
    catch (e) {
      throw new FailedException('获取系统设置', e.message)
    }
  }

  /**
   * 获得系统设置键值对
   *
   * @param settings 系统设置列表
   * @returns 系统设置键值对
   */
  private conventToMap(settings: SystemSettingEntity[]): ISystemSettingMap {
    return settings.reduce((map: ISystemSettingMap, setting) => {
      map[setting.key] = this.conventToTypedValue(setting)
      return map
    }, {})
  }

  /**
   * 类型化系统设置值
   *
   * @param setting 系统设置
   * @returns 类型化的设置值
   */
  private conventToTypedValue(setting: SystemSettingEntity) {
    const lastKey = setting.key.split('.').pop()

    // Boolean
    if (lastKey.startsWith('enable'))
      return setting.value === '1'

    if (['yes', 'no', 'true', 'false', 'y', 'n'].includes(setting.value.toLowerCase()))
      return ['yes', 'true', 'y'].includes(setting.value.toLowerCase())

    // JSON
    if (isJSON(setting.value))
      return JSON.parse(setting.value)

    // Number
    if (isNumberString(setting.value))
      return Number(setting.value)

    // String
    return setting.value
  }
}
