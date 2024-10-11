import type { ISystemRoleRepository, ISystemRoleSelect, ISystemRoleWhere } from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { SystemRoleEntity } from './entity'

@Injectable()
export class SystemRoleRepository implements ISystemRoleRepository {
  constructor(
    @InjectRepository(SystemRoleEntity)
    private readonly repo: Repository<SystemRoleEntity>,
  ) {}

  async findAndCount(
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: ['id', 'name', 'desc', 'sort', 'updatedTime'],
      skip,
      take,
      order: {
        sort: 'ASC',
        updatedTime: 'DESC',
      },
    })

    return {
      list,
      total,
      page,
      pagesize: take,
    }
  }

  async find(select: ISystemRoleSelect) {
    return await this.repo.find({
      select,
      order: {
        sort: 'ASC',
        updatedTime: 'DESC',
      },
    })
  }

  async findById(
    id: number,
    select: ISystemRoleSelect = ['id', 'name', 'desc', 'permissions', 'sort'],
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  async exists(where: ISystemRoleWhere) {
    return await this.repo.exists({
      where,
    })
  }

  async create(data: Partial<SystemRoleEntity>) {
    data.name = data.name.trim()
    data.desc = data.desc || ''
    data.permissions = data.permissions || []
    data.sort = data.sort || 1

    return await this.repo.save(data)
  }

  async update(role: SystemRoleEntity, data: Partial<SystemRoleEntity>) {
    if (data.name.trim() !== role.name)
      role.name = data.name

    if (data.desc)
      role.desc = data.desc

    if (data.permissions)
      role.permissions = data.permissions

    if (data.sort !== undefined)
      role.sort = data.sort

    return await this.repo.save(role)
  }

  async destroy(id: number) {
    await this.repo.delete(id)
  }
}
