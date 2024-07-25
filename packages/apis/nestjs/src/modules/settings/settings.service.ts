import type { ISettings } from '@xiaoshop/schema'
import { In, Repository } from 'typeorm'
import { isNumberString } from 'class-validator'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import type { ISettingsModuleOptions, ISettingsTyped, ISettingsValue } from '@/settings/interface'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { SETTINGS_OPTIONS } from '@/settings/constants'
import { SettingsOptionPayload } from '@/settings/dto'
import { Settings } from '@/settings/settings.entity'

@Injectable()
export class SettingsService {
  private settings: ISettingsTyped = {}

  constructor(
    @Inject(SETTINGS_OPTIONS)
    private readonly options: ISettingsModuleOptions,

    @InjectRepository(Settings)
    private readonly repository: Repository<Settings>,
  ) {
  }

  /**
   * 获取全部系统设置
   *
   * @returns Promise<ISettings[]>
   * @see {@link ISettings}
   */
  async findList(): Promise<ISettings[]> {
    try {
      return await this.repository.find()
    }
    catch (e) {
      throw new FailedException('获取系统设置', e.message)
    }
  }

  /**
   * 创建系统设置
   *
   * @param data SettingsOptionPayload[]
   * @returns Promise<void>
   * @throws ExistsException
   * @throws FailedException
   * @see {@link ISettings}
   */
  async create(data: SettingsOptionPayload[]) {
    try {
      for (const item of data) {
        const exists = await this.repository.existsBy({
          key: item.key,
        })

        if (exists)
          throw new ExistsException(`系统设置项 [${item.key}] `)
      }

      const options: Settings[] = []

      for (const item of data) {
        const option = new Settings()
        option.key = item.key
        option.value = item.value
        options.push(option)
      }

      await this.repository.save(data, { chunk: 10 })
    }
    catch (e) {
      throw new FailedException('创建系统设置', e.message, e.status)
    }
  }

  /**
   * 更新系统设置
   *
   * @param data SettingsOptionPayload[]
   * @returns Promise<void>
   * @throws NotFoundException
   * @throws FailedException
   * @see {@link ISettings}
   */
  async update(data: SettingsOptionPayload[]) {
    try {
      for (const item of data) {
        const exists = await this.repository.existsBy({
          key: item.key,
        })

        if (!exists)
          throw new NotFoundException(`系统设置 #${item.key} `)

        await this.repository.update(
          { key: item.key },
          { value: item.value },
        )
      }
    }
    catch (e) {
      throw new FailedException('更新系统设置', e.message, e.status)
    }
  }

  /**
   * 删除指定 key 的系统设置
   *
   * @param keys string[]
   * @returns Promise<void>
   */
  async deleteByKeys(keys: string[]) {
    try {
      await this.repository.delete({ key: In(keys) })
    }
    catch (e) {
      throw new FailedException('删除系统设置', e.message)
    }
  }

  /**
   * 获取指定 key 的模块设置
   *
   * @param key string
   * @param defaultValue ISettingsValue
   * @returns Promise<ISettingsValue>
   */
  async get(key: string, defaultValue: ISettingsValue = ''): Promise<ISettingsValue> {
    const value = await this.repository.findOneBy({ key })

    return value
      ? this.convertValue(key, value.value)
      : defaultValue
  }

  /**
   * 获取模块设置
   *
   * @returns Promise<ISettingsTyped>
   */
  async moduleSettings() {
    await this.initModuleSettings()
    return this.settings
  }

  /**
   * 初始化模块设置
   *
   * @returns Promise<void>
   */
  private async initModuleSettings() {
    if (!this.options?.defaultSettings)
      return false

    try {
      if (Object.keys(this.settings).length === 0) {
        const keys = Object.keys(this.options.defaultSettings).map(key => this.getKey(key))

        const options = await this.repository.find({
          select: ['key', 'value'],
          where: {
            key: In(keys),
          },
        })

        for (const key of keys) {
          const option = options.find(item => item.key === this.getKey(key))
          const normalKey = key.replace(new RegExp(`^${this.options.keyPrefix}\.`), '')

          this.settings[normalKey] = option
            ? this.convertValue(option.key, option.value)
            : this.convertValue(normalKey, this.options.defaultSettings[normalKey])
        }

        return true
      }
    }
    catch (e) {
      throw new FailedException('初始化模块设置', e.message)
    }
  }

  /**
   * 获取设置项键名
   *
   * @param key string
   * @returns string
   */
  private getKey(key: string): string {
    return this.options.keyPrefix ? `${this.options.keyPrefix}.${key}` : key
  }

  /**
   * 转换类型
   */
  private convertValue(key: string, value: string): ISettingsValue {
    // boolean
    if (key.startsWith('enable'))
      return value === '1'

    // JSON
    else if ((value.startsWith('[') && value.endsWith(']')) || (value.startsWith('{') && value.endsWith('}')))
      return value ? JSON.parse(value) : ''

    // number
    else if (isNumberString(value))
      return value ? Number(value) : 0

    // string
    return String(value).toString()
  }
}
