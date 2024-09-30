import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { toEventName } from '~/utils/transformers'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { SystemRoleEntity } from '@/system/auth/role/entity'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { SystemRolePayload } from './dto/payload'
import { GetSystemRolePagesRequest } from './dto/request'
import { SystemRoleCreateEvent, SystemRoleDeleteEvent, SystemRoleUpdateEvent } from './events'

@Injectable()
export class SystemRoleAdminService {
  constructor(
    @InjectRepository(SystemRoleEntity)
    private readonly repository: Repository<SystemRoleEntity>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取系统角色列表
   *
   * @param query 查询条件
   * @returns 系统角色列表
   * @throws {FailedException} 获取系统角色列表失败
   */
  async findPages(
    query: GetSystemRolePagesRequest,
  ) {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'desc', 'sort', 'updatedTime'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取系统角色列表', e.message)
    }
  }

  /**
   * 获取系统角色字典列表
   *
   * @returns 系统角色字典列表
   * @throws {FailedException} 获取系统角色字典列表失败
   */
  async findDictList() {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取系统角色字典列表', e.message)
    }
  }

  /**
   * 获取系统角色信息
   *
   * @param id 角色 ID
   * @returns 角色信息
   * @throws {NotFoundException} 系统角色不存在
   * @throws {FailedException} 获取系统角色信息失败
   */
  async findById(id: number) {
    try {
      const role = await this.repository.findOne({
        select: ['id', 'name', 'desc', 'permissions', 'sort'],
        where: { id },
      })

      if (!role)
        throw new NotFoundException('系统角色')

      return role
    }
    catch (e) {
      throw new FailedException('获取系统角色信息', e.message, e.status)
    }
  }

  /**
   * 创建系统角色
   *
   * @param data 角色信息
   * @throws {ExistsException} 系统角色已存在
   * @throws {FailedException} 创建系统角色失败
   */
  async create(data: SystemRolePayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException('系统角色')

      const created = await this.repository.save(data)

      this.event.emit(
        toEventName(SystemRoleCreateEvent.name),
        new SystemRoleCreateEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建系统角色', e.message, e.status)
    }
  }

  /**
   * 更新系统角色
   *
   * @param id 角色 ID
   * @param data 角色信息
   * @throws {NotFoundException} 系统角色不存在
   * @throws {ExistsException} 系统角色已存在
   * @throws {FailedException} 更新系统角色失败
   */
  async update(id: number, data: SystemRolePayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('系统角色')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException('系统角色')

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(SystemRoleUpdateEvent.name),
        new SystemRoleUpdateEvent(id, data.name),
      )
    }
    catch (e) {
      throw new FailedException('更新系统角色', e.message, e.status)
    }
  }

  /**
   * 删除系统角色
   *
   * @param id 角色 ID
   */
  async delete(id: number) {
    try {
      const role = await this.repository.findOne({
        select: ['name'],
        where: { id },
      })

      if (role) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(SystemRoleDeleteEvent.name),
          new SystemRoleDeleteEvent(id, role.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除系统角色', e.message)
    }
  }
}
