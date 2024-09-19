import type { IDict } from '@xiaoshop/shared'

import { BadRequestException, Injectable } from '@nestjs/common'

import { FailedException } from '~/common/exceptions'

@Injectable()
export class SystemDictService {
  /**
   * 获取系统字典列表
   *
   * @param name 字典名称
   * @returns 系统字典列表
   * @throws {BadRequestException} 字典不存在
   * @throws {FailedException} 获取系统字典列表失败
   */
  async findDictList(name: string): Promise<IDict[]> {
    try {
      const dicts = await import('../../../common/dicts')

      const dictName = name.toUpperCase()

      if (!(dictName in dicts))
        throw new BadRequestException(`${name} 不存在`)

      return [
        ...dicts[dictName],
      ]
    }
    catch (e) {
      throw new FailedException('获取系统字典列表', e.message, e.status)
    }
  }
}
