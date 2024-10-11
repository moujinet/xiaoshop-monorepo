import type { ISystemUserRepository, ISystemUserSelect, ISystemUserWhere } from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SystemUserStatus, YesOrNo } from '@xiaoshop/shared'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'
import { generateSalt, hashPassword } from '~/utils/bcrypt'
import {
  CreateSystemUserPayload,
  UpdateSystemUserPayload,
} from '@/system/auth/dto/payload'

import { SystemUserEntity } from './entity'
import { SystemRoleEntity } from '../role/entity'

@Injectable()
export class SystemUserRepository implements ISystemUserRepository {
  constructor(
    @InjectRepository(SystemUserEntity)
    private readonly repo: Repository<SystemUserEntity>,
  ) {}

  async findAndCount(
    where: ISystemUserWhere,
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: {
        id: true,
        isAdmin: true,
        status: true,
        username: true,
        name: true,
        mobile: true,
        roles: { id: true, name: true },
        lastLoginIp: true,
        lastLoginTime: true,
        lastLockedIp: true,
        lockedTime: true,
      },
      where,
      skip,
      take,
      relations: ['roles'],
      order: {
        lastLoginTime: 'DESC',
      },
    })

    return {
      list,
      total,
      page,
      pagesize: take,
    }
  }

  async find(
    select: ISystemUserSelect = ['id', 'isAdmin', 'status', 'name'],
    where?: ISystemUserWhere,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        lastLoginTime: 'DESC',
      },
    })
  }

  async findOne(where: ISystemUserWhere, select?: ISystemUserSelect) {
    return await this.repo.findOne({
      select: select || {
        id: true,
        isAdmin: true,
        status: true,
        username: true,
        name: true,
        mobile: true,
        roles: { id: true, name: true },
      },
      relations: ['roles'],
      where,
    })
  }

  async findById(id: number, select?: ISystemUserSelect) {
    return await this.findOne({ id }, select)
  }

  async exists(where: ISystemUserWhere) {
    return await this.repo.exists({
      where,
    })
  }

  async create(data: CreateSystemUserPayload) {
    const user = new SystemUserEntity()

    user.name = data.name.trim()
    user.username = data.username.trim()
    user.mobile = data.mobile.trim()
    user.isAdmin = data.isAdmin || YesOrNo.NO
    user.status = SystemUserStatus.NORMAL
    user.roles = []

    user.salt = await generateSalt()
    user.password = await hashPassword(data.password, user.salt)

    if (data.roleIds && data.roleIds.length) {
      for (const roleId of data.roleIds) {
        const role = new SystemRoleEntity()
        role.id = roleId
        user.roles.push(role)
      }
    }

    return await this.repo.save(user)
  }

  async update(user: SystemUserEntity, data: UpdateSystemUserPayload) {
    if (data.name && data.name.trim() !== user.name)
      user.name = data.name.trim()

    if (data.mobile && data.mobile.trim() !== user.mobile)
      user.mobile = data.mobile.trim()

    if (data.isAdmin !== undefined && data.isAdmin !== user.isAdmin)
      user.isAdmin = data.isAdmin

    if (data.status !== undefined && data.status !== user.status)
      user.status = data.status

    user.roles = []

    if (data.roleIds && data.roleIds.length) {
      for (const roleId of data.roleIds) {
        const role = new SystemRoleEntity()
        role.id = roleId
        user.roles.push(role)
      }
    }

    return await this.repo.save(user)
  }

  async updateStatus(id: number, status: SystemUserStatus) {
    await this.repo.update(id, { status })
  }

  async updatePassword(id: number, password: string) {
    const user = new SystemUserEntity()

    user.id = id
    user.salt = await generateSalt()
    user.password = await hashPassword(password, user.salt)

    await this.repo.save(user)
  }

  async updateLoginTime(id: number, ip: string, time: string) {
    await this.repo.update(
      id,
      {
        lastLoginIp: ip,
        lastLoginTime: time,
      },
    )
  }

  async updateLockTime(id: number, ip: string, time: string) {
    await this.repo.update(
      id,
      {
        lastLockedIp: ip,
        lastLoginTime: time,
      },
    )
  }

  async destroy(id: number) {
    await this.repo.delete(id)
  }
}
