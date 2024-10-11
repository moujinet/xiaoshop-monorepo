import type { ISystemRoleRepository } from '@/system/auth/model/role/interface'
import type { IApiPaginationData, ISystemRoleDict, ISystemRoleInfo, ISystemRoleList } from '@xiaoshop/shared'

import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { SystemRolePayload } from '@/system/auth/dto/payload'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { SystemRoleRepo } from '@/system/auth/model/role/provider'
import { GetSystemRolePagesRequest } from '@/system/auth/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { SystemRoleCreateEvent, SystemRoleDeleteEvent, SystemRoleUpdateEvent } from './events'

@Injectable()
export class SystemRoleService {
  constructor(
    @SystemRoleRepo()
    private readonly repo: ISystemRoleRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取分页角色列表
   *
   * @param query 查询条件
   * @returns 分页角色列表
   * @throws {FailedException} 获取角色列表失败
   */
  async findPages(
    query: GetSystemRolePagesRequest,
  ): Promise<IApiPaginationData<ISystemRoleList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(page, pagesize)
    }
    catch (e) {
      throw new FailedException('获取角色列表', e.message)
    }
  }

  /**
   * 获取角色字典列表
   *
   * @returns 角色字典列表
   * @throws {FailedException} 获取角色字典列表失败
   */
  async findDictList(): Promise<ISystemRoleDict[]> {
    try {
      return await this.repo.find(['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取角色字典列表', e.message)
    }
  }

  /**
   * 获取角色信息
   *
   * @param id 角色 ID
   * @returns 获取角色信息失败
   */
  async findById(id: number): Promise<ISystemRoleInfo> {
    try {
      const role = await this.repo.findById(id)

      if (!role)
        throw new NotFoundException('角色不存在')

      return role
    }
    catch (e) {
      throw new FailedException('获取角色信息', e.message, e.status)
    }
  }

  /**
   * 创建角色
   *
   * @param data 角色信息
   * @throws {ExistsException} 角色已存在
   * @throws {FailedException} 创建角色失败
   */
  async create(data: SystemRolePayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('角色已存在')

      const role = await this.repo.create(data)

      this.event.emit(
        new SystemRoleCreateEvent(role.id, role.name),
      )
    }
    catch (e) {
      throw new FailedException('创建角色', e.message, e.status)
    }
  }

  /**
   * 更新角色
   *
   * @param id 角色 ID
   * @param data 更新信息
   * @throws {FailedException} 创建角色失败
   * @throws {NotFoundException} 角色不存在
   * @throws {ExistsException} 角色已存在
   */
  async update(id: number, data: SystemRolePayload) {
    try {
      const role = await this.repo.findById(id)

      if (!role)
        throw new NotFoundException('角色不存在')

      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('角色已存在')

      const updated = await this.repo.update(role, data)

      this.event.emit(
        new SystemRoleUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('创建角色', e.message, e.status)
    }
  }

  /**
   * 删除角色
   *
   * @param id 角色 ID
   * @throws {FailedException} 删除角色失败
   */
  async delete(id: number) {
    try {
      const role = await this.repo.findById(id, ['id', 'name'])

      if (role) {
        await this.repo.destroy(role.id)

        this.event.emit(
          new SystemRoleDeleteEvent(role.id, role.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除角色', e.message)
    }
  }
}
