import type {
  ISettingOption,
  ISettingOptionMap,
} from '@xiaoshop/shared'
import { Repository } from 'typeorm'
import { Cache } from 'cache-manager'
import { pickBy } from 'es-toolkit/object'
import { isNumberString } from 'class-validator'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { SettingOption } from '@/settings/entity'
import { UpdateSettingsPayload } from '@/settings/dto'
import { SettingsUpdatedEvent } from '@/settings/events'
import { SETTINGS_MODULE_CACHE_KEY } from '@/settings/constants'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingOption)
    private readonly repository: Repository<SettingOption>,

    @Inject(CACHE_MANAGER)
    private cache: Cache,

    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取所有设置
   *
   * @returns Promise<ISettingOptionMap>
   * @throws {FailedException} 获取所有设置失败
   */
  async findAll(): Promise<ISettingOptionMap> {
    try {
      const cached = await this.cache.get<ISettingOptionMap>(
        SETTINGS_MODULE_CACHE_KEY,
      )

      if (cached)
        return cached

      const result = await this.repository.find({
        select: ['key', 'value'],
        order: {
          key: 'ASC',
        },
      }).then(async (data) => {
        const map = this.conventToMap(data)
        await this.cache.set(SETTINGS_MODULE_CACHE_KEY, map, 0)

        return map
      })

      return result
    }
    catch (e) {
      throw new FailedException('获取设置值', e.message)
    }
  }

  /**
   * 根据设置名获取设置，支持通配符
   *
   * @param key 设置名
   * @returns Promise<ISettingOptionMap>
   * @throws {FailedException} 获取设置失败
   */
  async findByKey(key: string): Promise<ISettingOptionMap> {
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
      throw new FailedException('获取指定设置', e.message, e.status)
    }
  }

  /**
   * 根据设置名获取设置值
   *
   * @param key 设置名
   * @returns 设置值
   * @throws {NotFoundException} 获取指定设置值失败
   */
  async findValueByKey(key: string) {
    try {
      const cached = await this.findAll()
      return cached[key] || null
    }
    catch (e) {
      throw new NotFoundException('获取指定设置值', e.message)
    }
  }

  /**
   * 更新设置
   *
   * @param data 更新设置数组
   * @throws {FailedException} 更新设置失败
   */
  async update(data: UpdateSettingsPayload[]) {
    try {
      for (const item of data) {
        if (await this.repository.existsBy({ key: item.key })) {
          await this.repository.update(
            { key: item.key },
            { value: item.value },
          )

          this.event.emit(
            toEventName(SettingsUpdatedEvent.name),
            new SettingsUpdatedEvent(item.key, item.value),
          )
        }
      }
    }
    catch (e) {
      throw new FailedException('更新设置值', e.message)
    }
  }

  /**
   * 将设置数组转换为键值映射
   *
   * @param settings 设置数组
   * @returns 键值映射
   */
  conventToMap(settings: ISettingOption[]): ISettingOptionMap {
    return settings.reduce((map, item) => {
      const lastKey = item.key.includes('.')
        ? item.key.split('.').slice(-1)[0]
        : item.key

      // Boolean
      if (lastKey === 'enable') {
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
    }, {} as ISettingOptionMap)
  }
}
