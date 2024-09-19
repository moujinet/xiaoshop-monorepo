import type { ISystemSetting, ISystemSettingMap } from '@xiaoshop/shared'

import { Repository } from 'typeorm'
import { Cache } from 'cache-manager'
import { pickBy } from 'es-toolkit/object'
import { isNumberString } from 'class-validator'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { toEventName } from '~/utils/transformers'
import { FailedException, NotFoundException } from '~/common/exceptions'

import { SystemSettings } from './entity'
import { SETTINGS_CACHE_KEY } from './constants'
import { UpdateSystemSettingsPayload } from './dto'
import { SystemSettingsUpdateEvent } from './events'

@Injectable()
export class SystemSettingsService {
  constructor(
    @InjectRepository(SystemSettings)
    private readonly repository: Repository<SystemSettings>,

    @Inject(CACHE_MANAGER)
    private cache: Cache,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取所有系统设置
   *
   * @returns 系统设置
   * @throws {FailedException} 获取所有系统设置失败
   */
  async findAll(): Promise<ISystemSettingMap> {
    try {
      const cached = await this.cache.get<ISystemSettingMap>(SETTINGS_CACHE_KEY)

      if (cached)
        return cached

      const settings = await this.repository.find({
        order: { key: 'ASC' },
      }).then<ISystemSettingMap>(async (data) => {
        const map = this.conventToMap(data)
        await this.cache.set(SETTINGS_CACHE_KEY, map, 0)

        return map
      })

      return settings
    }
    catch (e) {
      throw new FailedException('获取所有系统设置', e.message)
    }
  }

  /**
   * 根据系统设置名称获取设置项 (支持通配符)
   *
   * @param key 系统设置名称
   * @returns 设置映射对象
   * @throws {FailedException} 获取系统设置失败
   */
  async findByKey(key: string): Promise<ISystemSettingMap> {
    try {
      const isWildcard = key.includes('.*')

      if (isWildcard)
        key = key.replace('.*', '')

      const cached = await this.findAll()

      return pickBy(cached, (_, k) => {
        if (isWildcard) {
          if (k.includes(key))
            return true
        }
        else if (k === key) {
          return true
        }
      })
    }
    catch (e) {
      throw new FailedException('获取系统设置', e.message)
    }
  }

  /**
   * 根据系统设置名称获取设置值 (支持通配符)
   *
   * @param key 系统设置名称
   * @returns 设置值
   */
  async findValue(key: string) {
    try {
      const settings = await this.findByKey(key)
      return settings[key] || null
    }
    catch (e) {
      throw new NotFoundException('系统设置', e.message)
    }
  }

  /**
   * 更新系统设置
   *
   * @param settings 系统设置
   * @throws {FailedException} 更新系统设置失败
   */
  async update(settings: UpdateSystemSettingsPayload[]) {
    try {
      await Promise.all(settings.map(async ({ key, value }) => {
        if (await this.repository.existsBy({ key })) {
          await this.repository.update({ key }, { value })

          this.event.emit(
            toEventName(SystemSettingsUpdateEvent.name),
            new SystemSettingsUpdateEvent(key, value),
          )
        }
      }))
    }
    catch (e) {
      throw new FailedException('更新系统设置', e.message)
    }
  }

  /**
   * 清除缓存
   */
  async clearCache() {
    await this.cache.del(SETTINGS_CACHE_KEY)
  }

  /**
   * 将设置数组转换为键值映射
   *
   * @param settings 设置数组
   * @returns 键值映射
   */
  conventToMap(settings: ISystemSetting[]): ISystemSettingMap {
    return settings.reduce((map, item) => {
      const lastKey = item.key.includes('.')
        ? item.key.split('.').slice(-1)[0]
        : item.key

      // Boolean
      if (lastKey.startsWith('enable')) {
        map[item.key] = item.value === '1'
      }

      // JSON
      else if (
        (item.value.startsWith('{') && item.value.endsWith('}'))
        || (item.value.startsWith('[') && item.value.endsWith(']'))
      ) {
        map[item.key] = item.value ? JSON.parse(item.value) : ''
      }

      // Number
      else if (isNumberString(item.value)) {
        map[item.key] = Number(item.value)
      }

      // String
      else {
        map[item.key] = item.value
      }

      return map
    }, {} as ISystemSettingMap)
  }
}
