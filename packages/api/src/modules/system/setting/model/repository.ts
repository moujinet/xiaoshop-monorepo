import { Like, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { SystemSettingEntity } from './entity'
import { ISystemSettingRepository } from './interface'

@Injectable()
export class SystemSettingRepository implements ISystemSettingRepository {
  constructor(
    @InjectRepository(SystemSettingEntity)
    private readonly repo: Repository<SystemSettingEntity>,
  ) {}

  async findAll(): Promise<SystemSettingEntity[]> {
    return await this.repo.find({
      order: { key: 'ASC' },
    })
  }

  async findByKey(key: string): Promise<SystemSettingEntity[]> {
    const isWildcard = key.includes('.*')

    if (isWildcard)
      key = key.replace('.*', '')

    return await this.repo.find({
      where: { key: isWildcard ? Like(`${key}%`) : key },
      order: { key: 'ASC' },
    })
  }

  async findOne(key: string) {
    return await this.repo.findOneBy({ key })
  }

  async update(settings: { key: string, value: string }[]) {
    await Promise.all(
      settings.map(async ({ key, value }) => {
        await this.repo.update(key, { value })
      }),
    )
  }
}
